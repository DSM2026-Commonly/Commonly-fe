import {
  IndividualRegistrationCareer,
  type IndividualRegistrationSubjectData,
} from "@commonly/ui";
import { useLocation, useNavigate } from "react-router";

interface IndividualRegistrationCareerState {
  subject?: IndividualRegistrationSubjectData;
}

function IndividualRegistrationCareerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as IndividualRegistrationCareerState | null;

  return (
    <IndividualRegistrationCareer
      onPrevious={() => void navigate("/career/register/individual/subject")}
      onSubmit={(career) =>
        void navigate("/career/register/individual/complete", {
          state: {
            subjectName: state?.subject?.name,
            duties: career.duties,
          },
        })
      }
    />
  );
}

export default IndividualRegistrationCareerPage;
