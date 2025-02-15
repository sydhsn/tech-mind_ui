import { useAuth } from "../components/AuthProvider";
import { Button } from "../components/ui/button";
import { useLogoutMutation } from "../services/authApi";

const Logout = () => {
  const { logout } = useAuth();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutMutation().unwrap();
    logout(); // Clear auth state
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
