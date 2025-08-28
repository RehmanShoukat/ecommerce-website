import React, { useEffect, useState } from 'react';
import { Table, Tag, Input, Select, Spin } from 'antd';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

const { Option } = Select;

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = async () => {
    try {
      const q = query(collection(firestore, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'shipped' ? 'green' : 'orange'}>
          {(status || 'pending').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: amount => `Rs. ${amount?.toLocaleString()}`,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt =>
        createdAt?.seconds
          ? new Date(createdAt.seconds * 1000).toLocaleString()
          : 'N/A',
    },
  ];

  return (
    <div className='p-4'>
      <h2 className='mb-4 fw-bold'>All Orders</h2>

      <div className="d-flex gap-3 mb-4">
        <Input
          placeholder="Search by name or email"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 250 }}
        />
        <Select
          allowClear
          placeholder="Filter by status"
          onChange={(value) => setStatusFilter(value)}
          style={{ width: 180 }}
        >
          <Option value="pending">Pending</Option>
          <Option value="shipped">Shipped</Option>
        </Select>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: 'flex', justifyContent: 'center' }} />
      ) : (
        <Table
          dataSource={filteredOrders}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      )}
    </div>
  );
};

export default AllOrder;
