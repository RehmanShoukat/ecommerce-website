// import React from 'react'
// import { useAuthContext } from '../context/AuthContext'
// import { Navigate } from 'react-router-dom'

// const PrivateRoute = ({Component}) => {
//     const {isAuth}= useAuthContext()
//     if(!isAuth){return <Navigate to="/auth/login"/>}
//   return (
//    <Component/>
//   )
// }

// export default PrivateRoute
import React from 'react';

import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute = ({ Component }) => {
  const { isAuth, isAppLoading } = useAuthContext();

  if (isAppLoading) return <div>Loading...</div>;

  if (!isAuth) return <Navigate to="/auth/login" />;

  return <Component />;
};

export default PrivateRoute;
