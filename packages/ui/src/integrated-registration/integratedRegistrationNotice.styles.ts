import styled from "@emotion/styled";

export const RegistrationNoticeRoot = styled.section`
  display: flex;
  width: min(792px, calc(100% - 40px));
  margin: 0 auto;
  padding: 88px 0 64px;
  box-sizing: border-box;
  flex-direction: column;
  gap: 20px;
  color: var(--krds-light-color-text-basic, #1e2124);
  font-family:
    "Pretendard GOV", Pretendard, "Noto Sans KR", "Malgun Gothic", sans-serif;

  @media (max-width: 767px) {
    width: calc(100% - 40px);
    padding: 48px 0 56px;
    gap: 36px;
  }
`;

export const PageHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 24px;
  align-items: start;
  padding: 0;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 1px;

  @media (max-width: 767px) {
    font-size: 30px;
    line-height: 1.4;
    letter-spacing: 0;
  }
`;

export const StyledStepIndicator = styled.div`
  min-width: 0;
  overflow-x: auto;

  .krds-step-wrap {
    min-width: 360px;
    margin-bottom: 0;
  }
`;

export const FormFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const StepHeader = styled.div`
  min-height: 0;
`;

export const StepEyebrow = styled.p`
  margin: 0 0 8px;
  color: var(--krds-light-color-text-subtle, #464c53);
  font-size: 17px;
  font-weight: 700;
  line-height: 1.5;
`;

export const StepTitle = styled.h2`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.5;

  @media (max-width: 767px) {
    font-size: 26px;
  }
`;

export const FormMainContent = styled.div`
  display: flex;
  min-height: 551px;
  flex-direction: column;
  gap: 64px;
`;

export const GuideCard = styled.aside`
  display: flex;
  min-height: 198px;
  padding: 40px;
  box-sizing: border-box;
  border: 1px solid var(--krds-light-color-border-secondary-light, #d6e0eb);
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  background: var(--krds-light-color-surface-secondary-subtler, #eef2f7);

  @media (max-width: 767px) {
    min-height: auto;
    padding: 28px 24px;
  }
`;

export const GuideTitle = styled.h3`
  display: flex;
  margin: 0;
  align-items: center;
  gap: 8px;
  color: var(--krds-light-color-text-basic, #1e2124);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
`;

export const GuideIcon = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
`;

export const GuideBody = styled.p`
  margin: 0;
  white-space: pre-line;
  color: var(--krds-light-color-text-basic, #1e2124);
  font-size: 19px;
  font-weight: 400;
  line-height: 1.5;
`;

export const NoticeHeading = styled.h3`
  margin: 0 0 20px;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.5;
`;

export const StyledTextList = styled.ul`
  display: flex;
  min-height: 102px;
  margin: 0;
  padding: 0;
  flex-direction: column;
  gap: 12px;
  color: var(--krds-light-color-text-subtle, #464c53);
  font-size: 17px;
  line-height: 1.5;
  list-style: none;

  & > li {
    position: relative;
    min-height: 26px;
    margin: 0;
    padding-left: 32px;
  }

  & > li::before {
    position: absolute;
    top: 10px;
    left: 8px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    content: "";
  }
`;

export const AgreementBand = styled.div`
  display: flex;
  min-height: 74px;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background: var(--krds-light-color-surface-primary-subtler, #ecf2fe);

  .krds-form-check {
    min-width: 320px;
    justify-content: center;
  }
`;

export const ActionBar = styled.div`
  display: flex;
  min-height: 64px;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  min-width: 114px;

  .krds-btn {
    min-width: 114px;
  }

  @media (max-width: 767px) {
    width: 100%;

    .krds-btn {
      width: 100%;
    }
  }
`;
