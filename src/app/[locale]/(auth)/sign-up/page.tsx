"use client";
import Form from "@/components/form/Form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useTranslations } from "next-intl";
import { app } from "@/firebase";
import styles from "../sign.module.scss";
import { setUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useRouter } from "@/navigation";

const SingUpPage = (): React.ReactNode => {
  const t = useTranslations("SignUpPage");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      await updateProfile(auth.currentUser!, { displayName: username });

      dispatch(
        setUser({
          id: user.uid,
          token: user.refreshToken,
          username,
          email: user.email,
          lastSignInTime: user.metadata.lastSignInTime,
        })
      );

      router.replace("/");
    } catch (error) {
      alert("Something went wrong" + error);
    }
  };

  return (
    <div className={styles.sign}>
      <div className={styles.sign__block}>
        <h2>{t("signUp")}</h2>
        <div>
          <Form
            handleClick={handleRegister}
            signUp={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SingUpPage;
