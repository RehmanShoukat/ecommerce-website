import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const AdminRoute = ({ Component }) => {
  const { isAuth, isAdmin, isAppLoading } = useAuthContext();

  if (isAppLoading) {
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
          tip="Loading Admin Access..."
        />
      </div>
    );
  }

  if (!isAuth) return <Navigate to="/auth/login" />;
  if (!isAdmin) return <Navigate to="/" />;
    


  return <Component />;
};

export default AdminRoute;
