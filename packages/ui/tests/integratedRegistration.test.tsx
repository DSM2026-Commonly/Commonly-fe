import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import Header from "../src/header/Header";
import IndividualRegistrationSubject from "../src/individual-registration-subject/IndividualRegistrationSubject";
import IntegratedRegistrationNotice from "../src/integrated-registration/IntegratedRegistrationNotice";
import IntegratedRegistrationPreview from "../src/integrated-registration-preview/IntegratedRegistrationPreview";
import IntegratedRegistrationUpload from "../src/integrated-registration-upload/IntegratedRegistrationUpload";
import {
  getDaysInBirthMonth,
  isValidBirthDate,
  sanitizeApplicantName,
  sanitizeDatePart,
} from "../src/career-certificate/CareerCertificateIssue.validation";
import { findDuplicateCandidates } from "../src/individual-registration-subject/IndividualRegistrationSubject.utils";

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

  test("renders the individual subject form with KRDS controls", () => {
    const markup = renderToStaticMarkup(
      <IndividualRegistrationSubject onNext={() => undefined} />,
    );

    expect(markup).toContain(">2단계</span> / 3단계</p>");
    expect(markup).toContain("대상자 입력");
    expect(markup).toContain("기본 정보 입력");
    expect(markup).toContain("이름을 입력해주세요");
    expect(markup).toContain("생년월일 (숫자만 입력해주세요)");
    expect(markup).toContain("검색 버튼을 눌러주세요");
    expect(markup).toContain("krds-form-select");
    expect(markup).toContain("krds-form-check");
    expect(markup).toMatch(/<button[^>]*disabled[^>]*>다음으로<\/button>/);
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

describe("shared applicant validation", () => {
  test("sanitizes names and date parts like the certificate applicant form", () => {
    expect(sanitizeApplicantName("홍길동123")).toBe("홍길동");
    expect(sanitizeDatePart("1a23")).toBe("12");
  });

  test("rejects invalid dates and respects leap years", () => {
    expect(isValidBirthDate("2024", "2", "29")).toBe(true);
    expect(isValidBirthDate("2023", "2", "29")).toBe(false);
    expect(isValidBirthDate("2024", "13", "1")).toBe(false);
    expect(getDaysInBirthMonth("2024", "2")).toBe(29);
  });

  test("only reports candidates whose identifying information fully matches", () => {
    const subject = {
      name: "전재준",
      gender: "male" as const,
      birthYear: "2009",
      birthMonth: "2",
      birthDay: "10",
      address: "대전광역시 유성구 가정북로 76",
    };
    const candidates = [
      {
        id: "matching",
        name: "전재준",
        gender: "male" as const,
        birthYear: "2009",
        birthMonth: "02",
        birthDay: "10",
        address: "대전광역시 유성구 가정북로 76",
      },
      {
        id: "different-address",
        name: "전재준",
        gender: "male" as const,
        birthYear: "2009",
        birthMonth: "02",
        birthDay: "10",
        address: "대전광역시 유성구 대학로 211",
      },
    ];

    expect(findDuplicateCandidates(subject, candidates)).toEqual([
      candidates[0],
    ]);
  });
});
