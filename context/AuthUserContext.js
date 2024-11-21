// import { onAuthStateChanged } from "firebase/auth";
// import React, { useEffect } from "react";

// const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [loggedInUser, setLoggedInUser] = React.useState(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setLoggedInUser(user);
//         });

//         return () => unsubscribe();
//     }, [])

//   return (
//     <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => React.useContext(AuthContext);

// export default AuthContext;
