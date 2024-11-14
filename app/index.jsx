import { useEffect, useState } from "react";
import { useRouter } from "expo-router"; 
import { onAuthStateChangedListener } from "../firebase/firebaseAuth"; 

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const router = useRouter(); 

  useEffect(() => {
    
    const unsubscribe = onAuthStateChangedListener((user) => {
      setUser(user); 
      setLoading(false); 
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  useEffect(() => {
    
    if (!loading) {
      if (user === null) {
        router.push("/LoginScreen"); 
      } else {
        router.push("/home"); 
      }
    }
  }, [loading, user, router]); 

  if (loading) {
    return null; 
  }

  return null; 
}
