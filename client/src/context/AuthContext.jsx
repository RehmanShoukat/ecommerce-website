// import { createContext, useContext, useEffect, useReducer, useState } from 'react';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { auth, firestore } from "../config/firebase"; // ✅ Make sure firestore is imported
// import { doc, getDoc } from 'firebase/firestore'; // ✅ Add this

// const AuthContext = createContext();

// const inisitalState = { isAuth: false, user: {} };

// const reducer = (state, { type, payload }) => {
//   switch (type) {
//     case "SET_LOGGED_IN":
//       return { isAuth: true, user: payload.user };
//     case "SET_PROFILE":
//       return { ...state, user: { ...state.user, ...payload.user } };
//     case "SET_LOGGED_OUT":
//       return inisitalState;
//     default:
//       return state;
//   }
// };

// const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, inisitalState);
//   const [isAppLoading, setIsAppLoading] = useState(true);

//   useEffect(() => {
//     setIsAppLoading(true);
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         console.log("user sign in");

//         // ✅ Get role from Firestore
//         const userRef = doc(firestore, "users", user.uid);
//         const userSnap = await getDoc(userRef);
//         const userData = userSnap.exists() ? userSnap.data() : {};

//         dispatch({
//           type: "SET_LOGGED_IN",
//           payload: { user: { ...user, ...userData } }, // ✅ add role to user
//         });
//       } else {
//         console.log("user Logged out");
//         dispatch({ type: "SET_LOGGED_OUT" });
//       }
//       setIsAppLoading(false);
//     });
//   }, []);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("user is Logged out");
//         dispatch({ type: "SET_LOGGED_OUT" });
//         window.toastify("Logout success", "success");
//       })
//       .catch((error) => {
//         console.error(error);
//         window.toastify("User Not Logged Out", "error");
//       });
//   };

//   // ✅ Add isAdmin helper
//   const isAdmin = state.user?.role === "admin";

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         dispatch,
//         handleLogout,
//         isAppLoading,
//         isAdmin, // ✅ expose isAdmin
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => useContext(AuthContext);

// export default AuthContextProvider;

import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from "../config/firebase";
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

const initialState = {
  isAuth: false,
  user: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGGED_IN":
      return {
        isAuth: true,
        user: payload.user, // user object includes role
      };
    case "SET_LOGGED_OUT":
      return initialState;
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAppLoading(true);

      if (user) {
        try {
          // Fetch role from Firestore
          const userRef = doc(firestore, "users", user.uid);
          const userSnap = await getDoc(userRef);

          let userData = {};
          if (userSnap.exists()) {
            userData = userSnap.data();
          }

          const fullUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            Role:userData.role ,
            ...userData, // this includes role
          };

          console.log('fullUser', fullUser)

          dispatch({
            type: "SET_LOGGED_IN",
            payload: { user: fullUser },
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        dispatch({ type: "SET_LOGGED_OUT" });
      }

      setIsAppLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "SET_LOGGED_OUT" });
      window.toastify("Logout success", "success");
    } catch (error) {
      console.error("Logout error:", error);
      window.toastify("User Not Logged Out", "error");
    }
  };



  const isAdmin = state.user?.role === "admin";

  console.log("👤 Role:", state.user?.role); 
console.log("✅ isAdmin:", isAdmin);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        handleLogout,
        isAppLoading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;

