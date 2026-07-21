import { Checkbox, Radio, RadioGroup, Table, TextInput } from "krds-react";
import { CAREER_ROWS } from "../CareerCertificateIssue.constants";
import {
  CardStack,
  CardSubheading,
  CardTitle,
  ExtraFields,
  Fieldset,
  FormCard,
  RadioSection,
  SelectionCount,
  SelectionIntro,
  SelectionToolbar,
  TableFrame,
} from "./DetailsStep.styles";
import type { CertificateIssueType } from "../CareerCertificateIssue.types";

interface DetailsStepProps {
  issueType: CertificateIssueType;
  selectedCareerIds: string[];
  additionalNote: string;
  purpose: string;
  onIssueTypeChange: (issueType: CertificateIssueType) => void;
  onCareerSelection: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onAdditionalNoteChange: (value: string) => void;
  onPurposeChange: (value: string) => void;
}

interface CertificateExtraFieldsProps {
  idPrefix: string;
  additionalNote: string;
  purpose: string;
  onAdditionalNoteChange: (value: string) => void;
  onPurposeChange: (value: string) => void;
}

function CertificateExtraFields({
  idPrefix,
  additionalNote,
  purpose,
  onAdditionalNoteChange,
  onPurposeChange,
}: CertificateExtraFieldsProps) {
  return (
    <ExtraFields>
      <TextInput
        id={`${idPrefix}-additional-note`}
        label="그 밖의 사항"
        placeholder="추가 기입 사항을 입력해주세요"
        value={additionalNote}
        onChange={onAdditionalNoteChange}
      />
      <TextInput
        id={`${idPrefix}-purpose`}
        label="용도"
        placeholder="용도를 입력해주세요"
        value={purpose}
        onChange={onPurposeChange}
      />
    </ExtraFields>
  );
}

function DetailsStep({
  issueType,
  selectedCareerIds,
  additionalNote,
  purpose,
  onIssueTypeChange,
  onCareerSelection,
  onSelectAll,
  onAdditionalNoteChange,
  onPurposeChange,
}: DetailsStepProps) {
  const allCareersSelected = selectedCareerIds.length === CAREER_ROWS.length;

  return (
    <CardStack>
      <FormCard>
        <Fieldset>
          <legend className="sr-only">발급유형 선택</legend>
          <CardTitle>발급유형 선택</CardTitle>
          <RadioSection>
            <RadioGroup
              name="certificate-issue-type"
              value={issueType}
              onChange={(value) =>
                onIssueTypeChange(value as CertificateIssueType)
              }
              column
            >
              <Radio id="certificate-issue-all" value="all">
                전체 발급
              </Radio>
              <Radio id="certificate-issue-selected" value="selected">
                선택 발급
              </Radio>
            </RadioGroup>
          </RadioSection>
        </Fieldset>
      </FormCard>

      {issueType === "selected" ? (
        <FormCard>
          <CardTitle>내역 선택</CardTitle>
          <SelectionIntro>
            <CardSubheading>포함할 내역</CardSubheading>
            <SelectionToolbar>
              <SelectionCount aria-live="polite">
                {CAREER_ROWS.length}건 중{" "}
                <strong>{selectedCareerIds.length}건</strong> 선택됨
              </SelectionCount>
            </SelectionToolbar>
          </SelectionIntro>
          <TableFrame>
            <Table>
              <Table.Caption className="sr-only">
                경력증명서에 포함할 경력 내역
              </Table.Caption>
              <Table.Colgroup>
                <Table.Col width="80px" />
                <Table.Col width="231px" />
                <Table.Col width="170px" />
                <Table.Col width="231px" />
              </Table.Colgroup>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th scope="col">
                    <Checkbox
                      id="certificate-career-all"
                      checked={allCareersSelected}
                      aria-label="경력 내역 전체 선택"
                      onChange={(event) =>
                        onSelectAll(event.target.checked)
                      }
                    />
                  </Table.Th>
                  <Table.Th scope="col">담당 업무</Table.Th>
                  <Table.Th scope="col">근무 부서</Table.Th>
                  <Table.Th scope="col">근무 기간</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {CAREER_ROWS.map((row) => (
                  <Table.Tr key={row.id}>
                    <Table.Td>
                      <Checkbox
                        id={`certificate-${row.id}`}
                        checked={selectedCareerIds.includes(row.id)}
                        aria-label={`${row.job} 선택`}
                        onChange={(event) =>
                          onCareerSelection(row.id, event.target.checked)
                        }
                      />
                    </Table.Td>
                    <Table.Td>{row.job}</Table.Td>
                    <Table.Td>{row.department}</Table.Td>
                    <Table.Td>{row.period}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </TableFrame>
          <CertificateExtraFields
            idPrefix="certificate"
            additionalNote={additionalNote}
            purpose={purpose}
            onAdditionalNoteChange={onAdditionalNoteChange}
            onPurposeChange={onPurposeChange}
          />
        </FormCard>
      ) : (
        <FormCard>
          <CardTitle>비고</CardTitle>
          <CertificateExtraFields
            idPrefix="certificate-all"
            additionalNote={additionalNote}
            purpose={purpose}
            onAdditionalNoteChange={onAdditionalNoteChange}
            onPurposeChange={onPurposeChange}
          />
        </FormCard>
      )}
    </CardStack>
  );
}

export default DetailsStep;
