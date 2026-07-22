import "krds-react/dist/index.css";

import type { FormEvent } from "react";
import { useId, useState } from "react";
import { TextInput } from "krds-react";
import ApplicationShell from "../layout/ApplicationShell";
import {
  AccountHelpLink,
  AccountHelpLinks,
  AccountHelpSeparator,
  FieldGroup,
  FormError,
  HelpCard,
  HelpIcon,
  HelpList,
  HelpTitle,
  LoginContent,
  LoginEyebrow,
  LoginField,
  LoginFieldLabel,
  LoginForm,
  LoginHeading,
  LoginHeadingArea,
  LoginPanel,
  LoginSubmitButton,
} from "./login.styles";

export interface LoginFormData {
  loginId: string;
  password: string;
  rememberLoginId: boolean;
}

export interface LoginProps {
  initialLoginId?: string;
  onSubmit: (data: LoginFormData) => void | Promise<void>;
}

interface LoginFieldErrors {
  loginId?: string;
  password?: string;
}

function Login({ initialLoginId = "", onSubmit }: LoginProps) {
  const titleId = useId();
  const loginIdInputId = useId();
  const passwordInputId = useId();
  const [loginId, setLoginId] = useState(initialLoginId);
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedLoginId = loginId.trim();
    const nextFieldErrors: LoginFieldErrors = {};

    if (!normalizedLoginId) {
      nextFieldErrors.loginId = "아이디를 입력해 주세요.";
    }

    if (!password) {
      nextFieldErrors.password = "비밀번호를 입력해 주세요.";
    }

    setFieldErrors(nextFieldErrors);
    setSubmissionError("");

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        loginId: normalizedLoginId,
        password,
        rememberLoginId: false,
      });
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ApplicationShell headerVariant="not-auth">
      <LoginContent aria-labelledby={titleId}>
        <LoginHeadingArea>
          <LoginEyebrow>유성구 경력관리 시스템 사용자</LoginEyebrow>
          <LoginHeading id={titleId}>로그인</LoginHeading>
        </LoginHeadingArea>

        <LoginPanel>
          <LoginForm noValidate onSubmit={(event) => void handleSubmit(event)}>
            <FieldGroup>
              <LoginField>
                <LoginFieldLabel htmlFor={loginIdInputId}>
                  아이디
                </LoginFieldLabel>
                <TextInput
                  id={loginIdInputId}
                  name="loginId"
                  size="large"
                  value={loginId}
                  placeholder="아이디를 입력하세요"
                  aria-label="아이디"
                  autoComplete="username"
                  error={fieldErrors.loginId}
                  onChange={(value) => {
                    setLoginId(value);
                    setFieldErrors((currentErrors) => ({
                      ...currentErrors,
                      loginId: undefined,
                    }));
                  }}
                />
              </LoginField>
              <LoginField>
                <LoginFieldLabel htmlFor={passwordInputId}>
                  비밀번호
                </LoginFieldLabel>
                <TextInput
                  id={passwordInputId}
                  name="password"
                  type="password"
                  size="large"
                  value={password}
                  placeholder="비밀번호를 입력하세요"
                  aria-label="비밀번호"
                  autoComplete="current-password"
                  error={fieldErrors.password}
                  onChange={(value) => {
                    setPassword(value);
                    setFieldErrors((currentErrors) => ({
                      ...currentErrors,
                      password: undefined,
                    }));
                  }}
                />
              </LoginField>
            </FieldGroup>

            {submissionError && (
              <FormError role="alert">{submissionError}</FormError>
            )}

            <LoginSubmitButton
              variant="primary"
              size="large"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "로그인 중..." : "로그인"}
            </LoginSubmitButton>

            <AccountHelpLinks aria-label="계정 도움말 바로가기">
              <AccountHelpLink href="#login-help">아이디 찾기</AccountHelpLink>
              <AccountHelpSeparator aria-hidden="true" />
              <AccountHelpLink href="#login-help">비밀번호 찾기</AccountHelpLink>
              <AccountHelpSeparator aria-hidden="true" />
              <AccountHelpLink href="#login-help">회원가입</AccountHelpLink>
            </AccountHelpLinks>
          </LoginForm>
        </LoginPanel>

        <HelpCard id="login-help" aria-labelledby="login-help-title">
          <HelpTitle id="login-help-title">
            <HelpIcon aria-hidden="true">i</HelpIcon>
            로그인에 어려움이 있으신가요?
          </HelpTitle>
          <HelpList>
            <li>아이디가 기억나지 않는다면 '아이디 찾기'를 이용해 주세요.</li>
            <li>비밀번호를 잊으셨다면 '비밀번호 재설정'을 이용해 주세요.</li>
            <li>
              042-611-2114으로 전화주세요. 서비스에 로그인할 수 있도록
              도와드리겠습니다.
            </li>
          </HelpList>
        </HelpCard>
      </LoginContent>
    </ApplicationShell>
  );
}

export default Login;
