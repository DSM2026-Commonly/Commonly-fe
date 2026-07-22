export type CareerEditReason = "visit" | "phone" | "email" | "other";
export type CareerEditTarget = "personal" | "career";
export type CareerEditGender = "male" | "female";

export interface CareerEditApplicant {
  id: string;
  name: string;
  birthDate: string;
  address: string;
  gender?: CareerEditGender;
}

export interface CareerEditPersonalInfo {
  name: string;
  gender: CareerEditGender | "";
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  address: string;
}

export interface CareerEditRecord {
  id: string;
  position: string;
  duties: string;
  department: string;
  startDate: string;
  endDate: string;
  retirementReason: string;
  note: string;
}

export interface CareerEditSubmission {
  reason: CareerEditReason;
  reasonDetail: string;
  applicant: CareerEditApplicant;
  editTarget: CareerEditTarget;
  personalInfo: CareerEditPersonalInfo;
  record: CareerEditRecord;
}

export interface CareerEditProps {
  initialStep?: 0 | 1 | 2 | 3 | 4;
  initialEditTarget?: CareerEditTarget;
  applicants?: readonly CareerEditApplicant[];
  careerRecords?: readonly CareerEditRecord[];
  onCancel?: () => void;
  onComplete?: (submission: CareerEditSubmission) => void;
  onAddAnother?: () => void;
  onHome?: () => void;
}
