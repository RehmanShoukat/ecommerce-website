import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { supabase } from '../../../config/supabase';
import { Input, Select, Button, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const categories = [
  { label: 'Men', value: 'men' },
  { label: 'Women', value: 'women' },
  { label: 'Kids', value: 'kids' },
  { label: 'LimeLight', value: 'LimeLight' },
  { label: 'Daily wear', value: 'Daily wear' }
];

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [form] = Form.useForm(); // 👈 Ant Design form instance to control form

  // 👇 Upload image to Supabase Storage
  const uploadToSupabase = async (file) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `products/${uuidv4()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('product-images') // 👈 your bucket name
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase
      .storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // 👇 Handle custom image upload logic
  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const url = await uploadToSupabase(file);
      setImageUrl(url); // 👈 Store uploaded image URL
      onSuccess("ok");
      window.toastify("Image uploaded", "success");
    } catch (err) {
      console.error("Upload Error:", err);
      onError(err);
      window.toastify("Image upload failed", "error");
    }
  };

  // 👇 Form submission handler
  const onFinish = async (values) => {
    if (!imageUrl) {
      window.toastify("Please upload an image first", "warning");
      return;
    }

    try {
      setLoading(true);

      // Add product to Firestore
      await addDoc(collection(firestore, 'products'), {
        ...values,
        image: imageUrl,
        createdAt: serverTimestamp(),
      });

      // 👇 Clear the form fields and image preview
      form.resetFields();
      setImageUrl("");

      window.toastify('Product added successfully', 'success');
    } catch (error) {
      console.error('Error adding product:', error);
      window.toastify('Failed to add product', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 20 }}>Add New Clothing Product</h2>
      <Form
        form={form} // 👈 bind the form instance
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Product Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input placeholder="e.g. Denim Jacket" />
        </Form.Item>

        <Form.Item
          label="Price ($)"
          name="price"
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="e.g. 49.99" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select category">
            {categories.map(c => (
              <Option key={c.value} value={c.value}>{c.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea placeholder="Product details..." rows={4} />
        </Form.Item>

        <Form.Item
          label="Upload Image"
          rules={[{ required: true }]}
        >
          <Upload
            customRequest={handleUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>

          {/* 👇 Image preview after upload */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="preview"
              style={{ marginTop: 10, maxWidth: 200 }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
