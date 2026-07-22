import type { CareerCertificateIssueView } from "./CareerCertificateIssue.types";
import useScrollToTopOnChange from "../hooks/useScrollToTopOnChange";

function useCareerCertificateScroll(view: CareerCertificateIssueView) {
  useScrollToTopOnChange(view);
}

export default useCareerCertificateScroll;
