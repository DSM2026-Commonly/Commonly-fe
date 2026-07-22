import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import Login from "../src/login/Login";

describe("Login", () => {
  test("renders the approved shared login content", () => {
    const markup = renderToStaticMarkup(
      <Login onSubmit={() => undefined} />,
    );

    expect(markup).toContain("유성구 경력관리 시스템 사용자");
    expect(markup).toContain("아이디를 입력하세요");
    expect(markup).toContain("비밀번호를 입력하세요");
    expect(markup).toContain("회원가입");
    expect(markup).toContain("비밀번호 재설정");
    expect(markup).toContain("042-611-2114으로 전화주세요");
  });
});
