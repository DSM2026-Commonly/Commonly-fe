import { IndividualRegistrationSubject } from "@commonly/ui";
import { useNavigate } from "react-router";

function IndividualRegistrationSubjectPage() {
  const navigate = useNavigate();

  return (
    <IndividualRegistrationSubject
      onPrevious={() => void navigate("/career/register/individual")}
      onNext={() => void navigate("/career/register/individual/career")}
    />
  );
}

export default IndividualRegistrationSubjectPage;
