import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../api/auth/query";
import { errorToast, successToast } from "../toaster";

export const Logout = () => {
  const logoutUserMutatuon = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logoutUserMutatuon.mutateAsync(
        {},
        {
          onSuccess(data) {
            successToast(data.message);
            // window.location.href = '/login'
            navigate("/login");
          },
          onError(error) {
            console.error("error", error);
            errorToast(error.message);
          },
        }
      );
    } catch (error) {
      console.error("error", error);
      errorToast("something went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};