import React, { useEffect, useState } from 'react';
import { Table, Tag, Spin } from 'antd';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const q = query(collection(firestore, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'shipped' ? 'green' : "orange"}>
          {(status || 'unknown').toUpperCase()}
        </Tag>
      )
      ,
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `Rs. ${amount}`,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => new Date(createdAt?.seconds * 1000).toLocaleString(),
    },
  ];

  return (
    <div className='p-4'>
      <h2 className='mb-4 fw-bold'>All Orders</h2>
      {loading ? <Spin size="large" style={{display : 'flex' , justifyContent: "center" , alignItems: "center"}} /> : <Table dataSource={orders} columns={columns} rowKey="id" />}
    </div>
  );
};

export default OrderDetail;
