import { Button } from "krds-react";
import {
  SuccessActions,
  SuccessPage,
  SuccessTitle,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
} from "./CertificateSuccessView.styles";
import type { CertificateIssueType } from "../CareerCertificateIssue.types";

interface CertificateSuccessViewProps {
  issueType: CertificateIssueType;
  onRestart: () => void;
  onDownload: () => void;
}

function CertificateSuccessView({
  issueType,
  onRestart,
  onDownload,
}: CertificateSuccessViewProps) {
  return (
    <SuccessPage>
      <SuccessTitle>
        경력증명서 발급
        <br />
        업무 처리가 <strong>완료</strong>되었습니다.
      </SuccessTitle>
      <SummaryCard>
        <SummaryLabel>대상자</SummaryLabel>
        <SummaryValue>전재준</SummaryValue>
        <SummaryLabel>신청정보</SummaryLabel>
        <SummaryValue>
          <p>유성 구청 기간제 근로자 경력증명서 발급 신청</p>
          <p>{issueType === "all" ? "전체 발급" : "선택 발급"}</p>
        </SummaryValue>
      </SummaryCard>
      <SuccessActions>
        <Button variant="tertiary" size="xlarge" onClick={onRestart}>
          추가 발급하기
        </Button>
        <Button size="xlarge" onClick={onDownload}>
          경력증명서 다운로드
        </Button>
      </SuccessActions>
    </SuccessPage>
  );
}

export default CertificateSuccessView;
