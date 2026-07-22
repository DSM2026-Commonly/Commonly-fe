import { UserList } from "@commonly/ui";
import { useNavigate } from "react-router";

function UserListPage() {
  const navigate = useNavigate();

  return <UserList onHome={() => void navigate("/")} />;
}

export default UserListPage;
