import { TOKEN_EXPIRATION_SUBTRACT } from "@/constants/constants";
import { app } from "@/firebase";
import { useRouter } from "@/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

interface Auth {
  isAuth: boolean;
  userName: string | null;
  logOut: () => Promise<void>;
}

export const useAuth = (): Auth => {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const { expirationTime } = await user.getIdTokenResult(false);
          const expirationTimestamp = Date.parse(expirationTime);
          const isExpired =
            expirationTimestamp - Date.now() - TOKEN_EXPIRATION_SUBTRACT < 0;
          if (isExpired) {
            throw new Error("Token expired");
          }

          if (Date.now() >= expirationTimestamp) {
            throw new Error("Token expired");
          }
          setUserName(user.displayName);
          setIsAuth(true);
        } catch (error) {
          if ((error as Error).message === "Token expired") {
            await signOut(auth);
            setIsAuth(false);
            router.push("/");
          }
          alert("Error fetching token " + (error as Error).message);
        }
      } else {
        setIsAuth(false);
      }
    });

    return (): void => unsubscribe();
  }, [router]);

  const logOut = async (): Promise<void> => {
    const auth = getAuth(app);
    await signOut(auth);
    setIsAuth(false);
    router.push("/");
  };

  return { isAuth, userName, logOut };
};
