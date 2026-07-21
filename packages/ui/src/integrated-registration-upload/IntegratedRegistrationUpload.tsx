import "krds-react/dist/index.css";

import { useId, useMemo, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import {
  Button,
  StepIndicator,
  type FileItem,
} from "krds-react";
import {
  ActionBar,
  ButtonGroup,
  FileName,
  FormFlow,
  FormMainContent,
  HiddenFileInput,
  PageHeader,
  PageTitle,
  SelectedFileItem,
  SelectedFileList,
  StepCurrentText,
  StepEyebrow,
  StepHeader,
  StepTitle,
  StyledStepIndicator,
  UploadButtonWrap,
  UploadDropzone,
  UploadRoot,
  UploadText,
} from "./integratedRegistrationUpload.styles";

export interface IntegratedRegistrationUploadStep {
  id: string;
  title: string;
}

export interface IntegratedRegistrationUploadProps {
  title?: string;
  steps?: readonly IntegratedRegistrationUploadStep[];
  currentStep?: number;
  stepLabel?: string;
  stepTitle?: string;
  uploadText?: string;
  acceptedFileTypes?: string[];
  maxFiles?: number;
  maxFileSize?: number;
  previousLabel?: string;
  nextLabel?: string;
  onPrevious?: () => void;
  onNext?: (files: FileItem[]) => void;
}

const defaultSteps = [
  { id: "notice", title: "유의사항 확인" },
  { id: "upload", title: "파일 업로드" },
  { id: "confirm", title: "데이터 확인" },
] as const satisfies readonly IntegratedRegistrationUploadStep[];

function IntegratedRegistrationUpload({
  title = "경력사항 통합 등록",
  steps = defaultSteps,
  currentStep = 1,
  stepLabel = "2단계 / 3단계",
  stepTitle = "엑셀 파일 업로드",
  uploadText = "첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 직접 선택해주세요.",
  acceptedFileTypes = ["xlsx", "xls", "csv"],
  maxFiles = 1,
  maxFileSize = 20 * 1024 * 1024,
  previousLabel = "이전으로",
  nextLabel = "다음으로",
  onPrevious,
  onNext,
}: IntegratedRegistrationUploadProps) {
  const titleId = useId();
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileItem[]>([]);

  const canProceed = useMemo(
    () =>
      files.length > 0 &&
      files.every((file) => file.status === "ready" || file.status === "completed") &&
      Boolean(onNext),
    [files, onNext],
  );

  const formatFileSize = (size: number) => {
    if (size === 0) {
      return "0B";
    }

    const unit = 1024;
    const units = ["B", "KB", "MB", "GB"] as const;
    const unitIndex = Math.min(
      Math.floor(Math.log(size) / Math.log(unit)),
      units.length - 1,
    );

    return `${Number((size / unit ** unitIndex).toFixed(1))}${units[unitIndex]}`;
  };

  const getFileExtension = (fileName: string) =>
    fileName.split(".").pop()?.toLowerCase() ?? "";

  const buildFileItem = (file: File, index: number): FileItem => {
    const extension = getFileExtension(file.name);
    const isAccepted = acceptedFileTypes.includes(extension);
    const isUnderLimit = file.size <= maxFileSize;
    const hasError = !isAccepted || !isUnderLimit;

    return {
      id: `${file.name}-${file.lastModified}-${index}`,
      name: file.name,
      size: file.size,
      type: extension,
      status: hasError ? "error" : "ready",
      errorMessage: hasError
        ? !isAccepted
          ? `${acceptedFileTypes.join(", ")} 파일만 업로드할 수 있습니다.`
          : "등록 가능한 파일 용량을 초과하였습니다."
        : undefined,
    };
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList?.length) {
      return;
    }

    setFiles(Array.from(fileList).slice(0, maxFiles).map(buildFileItem));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleNext = () => {
    if (!canProceed) {
      return;
    }

    onNext?.(files);
  };

  return (
    <UploadRoot aria-labelledby={titleId}>
      <PageHeader>
        <PageTitle id={titleId}>{title}</PageTitle>
        <StyledStepIndicator>
          <StepIndicator
            steps={steps.map((step, index) => ({
              id: step.id,
              step: `${index + 1}단계`,
              title: step.title,
            }))}
            currentStep={currentStep}
            currentStepText="현재 단계"
          />
        </StyledStepIndicator>
      </PageHeader>

      <FormFlow>
        <StepHeader>
          <StepEyebrow>
            <StepCurrentText>{stepLabel.split(" / ")[0]}</StepCurrentText>
            {stepLabel.includes(" / ") ? ` / ${stepLabel.split(" / ")[1]}` : ""}
          </StepEyebrow>
          <StepTitle>{stepTitle}</StepTitle>
        </StepHeader>

        <FormMainContent>
          <UploadDropzone onDragOver={handleDragOver} onDrop={handleDrop}>
            <UploadText>{uploadText}</UploadText>
            <UploadButtonWrap>
              <HiddenFileInput
                ref={fileInputRef}
                id={fileInputId}
                type="file"
                accept={acceptedFileTypes.map((type) => `.${type}`).join(",")}
                onChange={handleInputChange}
              />
              <Button
                variant="primary"
                size="medium"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                파일선택
              </Button>
            </UploadButtonWrap>
          </UploadDropzone>

          {files.length > 0 && (
            <SelectedFileList aria-label="첨부 파일 목록">
              {files.map((file) => (
                <SelectedFileItem key={file.id} data-status={file.status}>
                  <FileName>
                    {file.name} [{file.type}, {formatFileSize(file.size)}]
                  </FileName>
                </SelectedFileItem>
              ))}
            </SelectedFileList>
          )}
        </FormMainContent>

        <ActionBar>
          <ButtonGroup>
            <Button
              variant="secondary"
              size="xlarge"
              type="button"
              onClick={onPrevious}
            >
              {previousLabel}
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              variant="primary"
              size="xlarge"
              type="button"
              disabled={!canProceed}
              onClick={handleNext}
            >
              {nextLabel}
            </Button>
          </ButtonGroup>
        </ActionBar>
      </FormFlow>
    </UploadRoot>
  );
}

export default IntegratedRegistrationUpload;
