// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import React, { useState } from 'react'
// import { auth, firestore } from '../../config/firebase'
// import { doc, setDoc } from 'firebase/firestore'
// import { Button, Col, Form, Input, Row, Typography } from 'antd'
// import { Link } from 'react-router-dom'
// import bgImage from '../../assets/Auth.jpeg'

// const { Title } = Typography

// const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

// const Register = () => {
//   const [state, setState] = useState(initialState)
//   const [isProcessing, setIsProcessing] = useState(false)

//   const handleChange = (e) => {
//     setState(s => ({ ...s, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     let { firstName, lastName, email, password, confirmPassword } = state
//     firstName = firstName.trim()

//     if (firstName.length < 3) return window.toastify("Please Enter Your Name correctly", "error")
//     if (password.length < 6) return window.toastify("Enter your password correctly", "error")
//     if (confirmPassword !== password) return window.toastify("Password does not match", "error")

//     const userData = { firstName, lastName, email }
//     setIsProcessing(true)

//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user
//         createDocument({ ...userData, uid: user.uid })
//         window.toastify("User Register successfully", "success")
//         console.log('user', user)
//       })
//       .catch((error) => {
//         console.error(error)
//         window.toastify("Something went wrong, user not created", "error")
//       })
//       .finally(() => {
//         setIsProcessing(false)
//       })
//   }

//   const createDocument = async (userData) => {
//     try {
//       await setDoc(doc(firestore, "user", userData.uid), userData)
//     } catch (error) {
//       console.error(error)
//       window.toastify("Something is wrong")
//     }
//   }

//   return (
    
//     <div
//       className="login-page"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="overlay"></div>

//       <div className="login-container">
//         <div className="login-left">
//           <h1>Welcome ShopMe</h1>
//           <p>
//             Securely sign in to access your personalized dashboard, order history, and exclusive shopping deals.

//           </p>
//           <div className="social-icons">
//             <i className="fab fa-facebook-f"></i>
//             <i className="fab fa-twitter"></i>
//             <i className="fab fa-instagram"></i>
//             <i className="fab fa-youtube"></i>
//           </div>
//         </div>

//         <div className="login-right">
//           <div className="login-form">
//             <Title level={2}>Sign up</Title>
//             <Form layout='vertical'>
//               <Row gutter={16}>
//                 <Col span={12}>
//                   <Form.Item label='First Name' required>
//                     <Input name='firstName' placeholder='First Name' size='large' onChange={handleChange} />
//                   </Form.Item>
//                 </Col>
//                 <Col span={12}>
//                   <Form.Item label='Last Name' required>
//                     <Input name='lastName' placeholder='Last Name' size='large' onChange={handleChange} />
//                   </Form.Item>
//                 </Col>
//                 <Col span={24}>
//                   <Form.Item label='Email' required>
//                     <Input type='email' name='email' placeholder='Email' size='large' onChange={handleChange} />
//                   </Form.Item>
//                 </Col>
//                 <Col span={24}>
//                   <Form.Item label='Password' required>
//                     <Input.Password name='password' placeholder='Password' size='large' onChange={handleChange} />
//                   </Form.Item>
//                 </Col>
//                 <Col span={24}>
//                   <Form.Item label='Confirm Password' required>
//                     <Input.Password name='confirmPassword' placeholder='Confirm Password' size='large' onChange={handleChange} />
//                   </Form.Item>
//                 </Col>
//                 <Col span={24}>
//                   <Button type='primary' block size='large' loading={isProcessing} onClick={handleSubmit}>Register</Button>
//                 </Col>
//                 <Col span={24}>
//                   <p className='text-center mt-3' style={{ fontWeight: "600" }}>Already have an account? <Link to="/auth/login">Login</Link></p>
//                 </Col>
//               </Row>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Register


import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, firestore } from '../../config/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import bgImage from '../../assets/Auth.jpeg'

const { Title } = Typography

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Register = () => {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let { firstName, lastName, email, password, confirmPassword } = state
    firstName = firstName.trim()

    if (firstName.length < 3) return window.toastify("Please Enter Your Name correctly", "error")
    if (password.length < 6) return window.toastify("Enter your password correctly", "error")
    if (confirmPassword !== password) return window.toastify("Password does not match", "error")

    const userData = { firstName, lastName, email }
    setIsProcessing(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user

        // ✅ Firestore document create with role
        createDocument({ ...userData, uid: user.uid })

        window.toastify("User Register successfully", "success")
        console.log('user', user)
      })
      .catch((error) => {
        console.error(error)
        window.toastify("Something went wrong, user not created", "error")
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  // ✅ Create user document in Firestore with role: 'user'
  const createDocument = async (userData) => {
    try {
      await setDoc(doc(firestore, "users", userData.uid), {
        ...userData,
        role: 'user', // 👈 Default role assigned to all new registered users
        createdAt: serverTimestamp()
      })
    } catch (error) {
      console.error(error)
      window.toastify("Something is wrong")
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
            <Title level={2}>Sign up</Title>
            <Form layout='vertical'>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label='First Name' required>
                    <Input name='firstName' placeholder='First Name' size='large' onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Last Name' required>
                    <Input name='lastName' placeholder='Last Name' size='large' onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label='Email' required>
                    <Input type='email' name='email' placeholder='Email' size='large' onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label='Password' required>
                    <Input.Password name='password' placeholder='Password' size='large' onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label='Confirm Password' required>
                    <Input.Password name='confirmPassword' placeholder='Confirm Password' size='large' onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Button type='primary' block size='large' loading={isProcessing} onClick={handleSubmit}>Register</Button>
                </Col>
                <Col span={24}>
                  <p className='text-center mt-3' style={{ fontWeight: "600" }}>Already have an account? <Link to="/auth/login">Login</Link></p>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register



