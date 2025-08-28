import { Layout } from 'antd';
import React, { useState } from 'react';
import SiteBar from './SiteBar';
import HeaderBar from './HeaderBar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './Pages/AddProduct';
import OrderDetail from './Pages/OrderDetail';
import AllOrder from './Pages/AllOrder';
import AllProducts from './Pages/AllProducts';

const { Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false); // ✅ Maintain state here

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiteBar collapsed={collapsed} />
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content>
          <Routes>
            <Route index element={<AllOrder />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="all" element={<AllProducts />} />
            <Route path="order" element={<OrderDetail />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
