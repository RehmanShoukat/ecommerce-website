import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,} from '@ant-design/icons';
import adminImg from '../../assets/admin.jpg'; // Your admin image here
import { Layout, theme, Avatar, Button } from 'antd';

const {  Header  } = Layout;
const HeaderBar = ({collapsed, setCollapsed}) => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    return (
        <Header style={{ padding: '0 20px', background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '16px' }}
            />
            <div>
                <Avatar src={adminImg} />
                <span style={{ marginLeft: 10 }}>Welcome, Abdul Rehman</span>
            </div>
        </Header>

    )
}

export default HeaderBar