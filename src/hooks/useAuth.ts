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
          const { expirationTime } = await user.getIdTokenResult();
          const expirationTimestamp = Date.parse(expirationTime);
          if (Date.now() >= expirationTimestamp) {
            throw new Error("Token expired");
          }
          setUserName(user.displayName);
          setIsAuth(true);
        } catch (error) {
          alert("Error fetching token");
          if ((error as Error).message === "Token expired") {
            setIsAuth(false);
            router.push("/");
          }
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
