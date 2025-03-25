import { GoogleAuthProvider, signInWithPopup, User, UserCredential } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { FirebaseError } from "firebase/app";

type Props = {
  setUser: (value: User | null) => void;
};

const GoogleAuthentication = ({ setUser }: Props) => {
  useEffect(() => {
    const userStatus = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => userStatus();
  }, []);

  const handleGoogle = async (e: any) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error("Error during sign-in:", error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <section>
      <div className="text-center text-2xl my-24">
        <h2>Sing in to see your Event</h2>
      </div>

      <button
        onClick={handleGoogle}
        className="bg-black block text-white rounded p-2 mx-auto cursor-pointer"
      >
        Sign In with Google
      </button>
    </section>
  );
};

export default GoogleAuthentication;
