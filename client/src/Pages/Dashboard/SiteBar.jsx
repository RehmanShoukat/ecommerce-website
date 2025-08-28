import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import adminImg from '../../assets/admin.jpg'; // Your admin image here


const {  Sider  } = Layout;
const SiteBar = ({ collapsed }) => {
   
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* 👇 Admin Image/Avatar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px'
        }}>
          <img
            src={adminImg}
            alt="admin"
            className='img-fluid border-2 d-block mx-auto mb-2'
            style={{ width: "100px" }}
          />
          <p className='text-white' style={{ marginTop: '0px' }}>Admin</p>
        </div>

        {/* Sidebar Menu */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard" className='text-decoration-none'>Dashboard</Link>,
            },
            {
              key: 'addProduct',
              icon: <PlusOutlined />,
              label: <Link to="/dashboard/add" className='text-decoration-none'>Add Product</Link>,
            },
            {
              key: 'allProducts',
              icon: <UnorderedListOutlined />,
              label: <Link to="/dashboard/all" className='text-decoration-none'>All Products</Link>,
            },
            {
              key: 'orders',
              icon: <UploadOutlined />,
              label: <Link to="/dashboard/order" className='text-decoration-none'>Orders</Link>,
            },
          ]}
        />
      </Sider>
  )
}

export default SiteBar