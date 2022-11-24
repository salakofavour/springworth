import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useContext, createContext } from "react";
import { db, auth } from "../config/firebase";
import { getDoc, doc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ loading: true });
  // trigring the snapshot
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);
        getDoc(userRef).then((doc) => {
          setSnap("snap");
          setUser(doc.data());
          if (doc.data()?.subscription) {
            triggerSubscriptionStatus(doc.id);
          }
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  async function triggerSubscriptionStatus(id) {
    const { data } = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/subscription-status?id=${id}`
      )
    ).json();
  }

  useEffect(() => {
    const userId = auth?.currentUser?.uid;
    const q = doc(db, "users", userId ? userId : "0F2Uh2INGOo1xjq7LuUI");
    const unSub = onSnapshot(q, (doc) => {
      if (userId) {
        setUser(doc.data());
      }
    });
    return () => {
      unSub();
    };
  }, [snap]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
