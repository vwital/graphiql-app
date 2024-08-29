"use client";
import { useTranslations } from "next-intl";
import styles from "./form.module.scss";
import { useForm } from "react-hook-form";
import { LoginInterface } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "./schema";
import { app } from "@/firebase";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setUser } from "@/store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "@/navigation";

const LoginForm = (): React.ReactNode => {
  const t = useTranslations("Form");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
  });

  const handleLogin = async (
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

  const submitForm = (data: LoginInterface): void => {
    const { email, password } = data;
    handleLogin(email, password);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submitForm)}
    >
      <label className={styles.form__label}>{t("email")}</label>
      <input
        className={styles.form__input}
        type="text"
        placeholder={t("email")}
        {...register("email")}
      />
      {errors.email && (
        <p className={styles.form__error}>{errors.email.message}</p>
      )}
      <label className={styles.form__label}>{t("password")}</label>
      <input
        className={styles.form__input}
        type="password"
        placeholder={t("password")}
        {...register("password")}
      />
      {errors.password && (
        <p className={styles.form__error}>{errors.password.message}</p>
      )}
      <button
        className={styles.form__button}
        type="submit"
      >
        {t("submit")}
      </button>
    </form>
  );
};

export default LoginForm;
