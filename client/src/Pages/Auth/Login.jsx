import React, { useState } from 'react'
import { Form, Input, Button, Typography, Row, Col } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import bgImage from '../../assets/Auth.jpeg' // <-- your image path
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

const { Title } = Typography

const initialState = { email: '', password: '' }

const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const { email, password } = state

  //   setIsProcessing(true)

  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user
  //       window.toastify("User Login successfully", "success")
  //       navigate('/')
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       window.toastify("Something went wrong. Login failed.", "error")
  //     })
  //     .finally(() => {
  //       setIsProcessing(false)
  //     })
  // }

  const handleSubmit = async (e) => {
  e.preventDefault()
  const { email, password } = state

  setIsProcessing(true)

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // ✅ Get user document from Firestore
    const userDocRef = doc(firestore, "user", user.uid)
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data()
      const role = userData.role

      window.toastify("Login successful", "success")

      // ✅ Navigate based on role
      if (role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } else {
      window.toastify("No user data found in Firestore", "error")
    }

  } catch (error) {
    console.error("Login error:", error)
    window.toastify("Invalid email or password", "error")
  } finally {
    setIsProcessing(false)
  }
}
  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="overlay"></div>

      <div className="login-container">
        <div className="login-left">
          <h1>Welcome ShopMe</h1>
          <p>
            Securely sign in to access your personalized dashboard, order history, and exclusive shopping deals.

          </p>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form">
            <Title level={2}>Sign in</Title>



            <Form layout='vertical'>
              <Row gutter={32}>


                <Col span={24}>
                  <Form.Item label='email' required>
                    <Input type='email' placeholder='email' size="large" name='email' onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label='password' required>
                    <Input.Password placeholder='password' size="large" name='password' onChange={handleChange} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Login</Button>
                </Col>
                <Col span={24}>
                  <p className='mb-0 text-center mt-3' style={{ fontWeight: "700" }}>Don't have an account?<Link to="/auth/register">Register</Link></p>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login


