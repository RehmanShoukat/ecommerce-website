import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Image,
} from 'antd';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

const { Option } = Select;

const categories = [
  { label: 'Men', value: 'men' },
  { label: 'Women', value: 'women' },
  { label: 'Kids', value: 'kids' },
  { label: 'LimeLight', value: 'LimeLight' },
  { label: 'Daily wear', value: 'Dailywear' },
];

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(firestore, 'products'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, 'products', id));
    window.toastify('Product deleted successfully' , 'success');
    fetchProducts();
  };

  // Open modal for editing
  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // Update product
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const productRef = doc(firestore, 'products', editingProduct.id);
      await updateDoc(productRef, values);
      message.success('Product updated successfully');
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error('Update failed:', err);
      message.error('Failed to update product');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (img) => <Image width={60} src={img} />,
    },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Category', dataIndex: 'category' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Products</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={{ pageSize: 6 }}
      />

      {/* Modal for Editing */}
      <Modal
        title="Edit Product"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpdate}
        okText="Update"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Select category' }]}
          >
            <Select>
              {categories.map((cat) => (
                <Option key={cat.value} value={cat.value}>
                  {cat.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllProducts;
