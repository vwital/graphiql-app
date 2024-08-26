"use client";
import { useTranslations } from "next-intl";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "@/components/form/Form";
import { app } from "@/firebase";
import styles from "../sign.module.scss";
import { setUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useRouter } from "@/navigation";

const SignInPage = (): React.ReactNode => {
  const t = useTranslations("SignInPage");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async (
    _: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      dispatch(
        setUser({
          id: user.uid,
          token: user.refreshToken,
          username: user.displayName,
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
        <h2>{t("signIn")}</h2>
        <div>
          <Form handleClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
