import { AuthUser } from "@/store/slices/userSlice";
import { useAppSelector } from "./redux-hooks";

interface Auth extends AuthUser {
  isAuth: boolean;
}

export const useAuth = (): Auth => {
  const { id, email, username, token, lastSignInTime } = useAppSelector(
    (state) => state.user
  );
  return {
    isAuth: !!email,
    id,
    email,
    username,
    token,
    lastSignInTime,
  };
};
