import { IndividualRegistrationCareer } from "@commonly/ui";
import { useNavigate } from "react-router";

function IndividualRegistrationCareerPage() {
  const navigate = useNavigate();

  return (
    <IndividualRegistrationCareer
      onPrevious={() => void navigate("/career/register/individual/subject")}
    />
  );
}

export default IndividualRegistrationCareerPage;
