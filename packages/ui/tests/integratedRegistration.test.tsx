import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import Header from "../src/header/Header";
import IntegratedRegistrationNotice from "../src/integrated-registration/IntegratedRegistrationNotice";
import IntegratedRegistrationPreview from "../src/integrated-registration-preview/IntegratedRegistrationPreview";
import IntegratedRegistrationUpload from "../src/integrated-registration-upload/IntegratedRegistrationUpload";

describe("integrated registration flow", () => {
  test("keeps the notice copy and blocks navigation until agreement", () => {
    const markup = renderToStaticMarkup(
      <IntegratedRegistrationNotice onNext={() => undefined} />,
    );

    expect(markup).toContain("다음 사항을 유의하여 주시기 바랍니다.");
    expect(markup).toContain("등록 대상자의 인적사항이 일치하는지 확인하여 주시기 바랍니다.");
    expect(markup).toContain("krds-info-list decimal");
    expect(markup).toMatch(/<button[^>]*disabled[^>]*>다음으로<\/button>/);
  });

  test("keeps the individual notice unchecked until the user agrees", () => {
    const markup = renderToStaticMarkup(
      <IntegratedRegistrationNotice
        variant="individual"
        title="경력사항 개별 등록"
        steps={[
          { id: "notice", title: "유의사항 확인" },
          { id: "subject", title: "대상자 입력" },
          { id: "career", title: "경력사항 입력" },
        ]}
        onNext={() => undefined}
      />,
    );

    const nextButton = markup.match(/<button[^>]*>다음으로<\/button>/)?.[0];

    expect(markup).toContain("경력사항 개별 등록");
    expect(markup).toContain("대상자 입력");
    expect(markup).not.toContain('checked=""');
    expect(nextButton).toBeDefined();
    expect(nextButton).toContain("disabled");
  });

  test("keeps the upload constraints and blocks navigation without a file", () => {
    const markup = renderToStaticMarkup(
      <IntegratedRegistrationUpload onNext={() => undefined} />,
    );

    expect(markup).toContain("엑셀 파일 업로드");
    expect(markup).toContain('accept=".xlsx,.xls,.csv"');
    expect(markup).toContain("krds-file-upload");
    expect(markup).toMatch(/<button[^>]*disabled[^>]*>다음으로<\/button>/);
  });

  test("renders preview values as disabled form controls", () => {
    const markup = renderToStaticMarkup(<IntegratedRegistrationPreview />);

    expect(markup).toContain('value="홍길동"');
    expect(markup).toContain('value="2024.12.31"');
    expect(markup).toContain("krds-input large");
    expect(markup.match(/ disabled=""/g)?.length).toBe(11);
  });
});

describe("shared header", () => {
  test("keeps utility actions and primary navigation links", () => {
    const markup = renderToStaticMarkup(<Header variant="user" />);

    expect(markup).toContain("남은시간 00분 00초");
    expect(markup).toContain(">연장</button>");
    expect(markup).toContain(">로그아웃</button>");
    expect(markup).toContain("krds-btn text small");
    expect(markup).toContain("krds-btn link");
    expect(markup).toContain('href="/career/issue"');
    expect(markup).toContain('href="/career/register"');
  });
});
