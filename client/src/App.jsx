import React, { useEffect } from 'react'
import Routes from "./Pages/Routes"
import './App.scss'
import "bootstrap/dist/js/bootstrap.bundle";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Spin } from 'antd';
import OrderModal from './components/OrderModel';
import { useAuthContext } from './context/AuthContext';
import ScreenLoader from './components/ScreenLoader';


function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      // whether animation should happen only once
    });
  }, []);

  const {isAppLoading} = useAuthContext()
  return (
    <>
      {isAppLoading
      ? <div style={{height: "100vh" , display: "flex" , justifyContent : "center" , alignItems : "center" , backgroundColor: "#222"}}>
        <Spin size='large' tip="Loading..."/>
      </div>
    : <Routes />}
    </>
  )
}

export default App
