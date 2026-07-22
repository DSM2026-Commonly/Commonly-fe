import styled from "@emotion/styled";
import { Button, TextList } from "krds-react";

export const LoginContent = styled.section`
  display: flex;
  width: min(792px, calc(100% - clamp(32px, 5vw, 80px)));
  margin: 0 auto;
  padding: clamp(36px, 4.2vw, 64px) 0;
  box-sizing: border-box;
  flex-direction: column;
  color: var(--krds-light-color-text-basic, #1e2124);
  font-family:
    "Pretendard GOV", Pretendard, "Noto Sans KR", "Malgun Gothic", sans-serif;
`;

export const LoginHeadingArea = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LoginEyebrow = styled.p`
  margin: 0;
  color: var(--krds-light-color-text-subtle, #464c53);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
`;

export const LoginHeading = styled.h1`
  margin: 0;
  color: var(--krds-light-color-text-bolder, #131416);
  font-size: clamp(30px, 2.6vw, 40px);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 1px;
`;

export const LoginPanel = styled.div`
  width: 100%;
  margin-top: 48px;
  padding: 31px 32px 32px;
  box-sizing: border-box;
  border-top: 1px solid
    var(--krds-light-color-divider-gray, #8a949e);
  border-bottom: 1px solid
    var(--krds-light-color-divider-gray, #8a949e);

  @media (max-width: 767px) {
    margin-top: 32px;
    padding: 24px 0;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  width: min(100%, 480px);
  margin: 0 auto;
  flex-direction: column;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .form-group,
  .form-conts {
    width: 100%;
  }

  .krds-input {
    width: 100%;
    height: 56px;
    min-height: 56px;
    padding: 0 16px;
    box-sizing: border-box;
    border: 1px solid var(--krds-light-color-border-gray-dark, #58616a);
    border-radius: 8px;
    color: var(--krds-light-color-text-basic, #1e2124);
    background: var(--krds-light-color-surface-white, #ffffff);
    font-size: 19px;
    line-height: 1.5;
  }

  .krds-input::placeholder {
    color: var(--krds-light-color-text-subtle, #464c53);
    opacity: 1;
  }

  .krds-input:focus {
    border-color: var(--krds-light-color-border-primary, #256ef4);
    outline: 2px solid var(--krds-light-color-border-primary, #256ef4);
    outline-offset: 2px;
  }
`;

export const LoginField = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;

export const LoginFieldLabel = styled.label`
  color: var(--krds-light-color-text-subtle, #464c53);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
`;

export const RememberRow = styled.div`
  display: flex;
  min-height: 24px;
  margin-top: clamp(10px, 1vw, 14px);
  align-items: center;

  .krds-form-check {
    min-height: 24px;
  }
`;

export const FormError = styled.p`
  margin: 16px 0 0;
  color: var(--krds-light-color-text-danger, #bd2c0f);
  font-size: 15px;
  line-height: 1.5;
`;

export const LoginSubmitButton = styled(Button)`
  &.krds-btn {
    width: 100%;
    min-width: 0;
    height: 56px;
    min-height: 56px;
    margin-top: 24px;
    padding: 0 20px;
    border-radius: 8px;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.5;
  }
`;

export const AccountHelpLinks = styled.nav`
  display: flex;
  min-height: 24px;
  margin-top: 24px;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const AccountHelpLink = styled.a`
  padding: 2px;
  border-radius: 4px;
  color: var(--krds-light-color-text-subtle, #464c53);
  font-size: 15px;
  line-height: 1.5;
  text-decoration: none;

  &:hover {
    color: var(--krds-light-color-text-primary, #0b50d0);
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid var(--krds-light-color-border-primary, #256ef4);
    outline-offset: 2px;
  }
`;

export const AccountHelpSeparator = styled.span`
  width: 1px;
  height: 16px;
  flex: 0 0 1px;
  background: var(--krds-light-color-divider-gray-light, #cdd1d5);
`;

export const SectionDivider = styled.div`
  width: 100%;
  height: 0;
  margin: clamp(20px, 2vw, 28px) 0;
  border: 0;
  border-top: 1px solid var(--krds-light-color-divider-gray, #8a949e);
  background: transparent;
`;

export const HelpCard = styled.aside`
  width: 100%;
  min-height: 164px;
  margin-top: 40px;
  padding: 16px 24px;
  box-sizing: border-box;
  border: 1px solid
    var(--krds-light-color-border-secondary-light, #d6e0eb);
  border-radius: 12px;
  scroll-margin-top: 24px;
  background: var(--krds-light-color-surface-secondary-subtler, #eef2f7);

`;

export const HelpTitle = styled.h2`
  display: flex;
  margin: 0;
  align-items: center;
  gap: 8px;
  color: var(--krds-light-color-text-secondary, #052b57);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
`;

export const HelpIcon = styled.span`
  display: inline-flex;
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: var(--krds-light-color-text-basic-inverse, #ffffff);
  background: var(--krds-light-color-icon-secondary, #052b57);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

export const HelpList = styled(TextList)`
  margin: 12px 0 0;
  --krds-info-list--gap-layout-depth1-li-li: 8px;
  color: var(--krds-light-color-text-subtle, #464c53);
  font-size: 17px;
  line-height: 1.5;
`;
