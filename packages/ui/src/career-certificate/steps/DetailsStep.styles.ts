import styled from "@emotion/styled";

export {
  CardStack,
  CardSubheading,
  CardTitle,
  Fieldset,
  FormCard,
  RadioSection,
  TableFrame,
} from "./StepShared.styles";

export const SelectionIntro = styled.div`
  margin-top: 24px;
`;

export const SelectionToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
`;

export const SelectionCount = styled.p`
  margin: 0;
  color: var(--career-color-text-subtle);
  font-size: 15px;
  line-height: 1.5;

  strong {
    color: #0b50d0;
    font-weight: 700;
  }
`;

export const ExtraFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;

  .form-group,
  .form-conts,
  .krds-input {
    width: 100%;
  }
`;
