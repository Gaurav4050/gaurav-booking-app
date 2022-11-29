import React from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'
import Header from '../../components/header/Header.jsx'
import './home.css'
import Featured from '../../components/feature/Featured.jsx'
import PropertyList from '../../components/propertlist/PropertList.jsx'
import FeaturedProperties from '../../components/featureProperty/FeatureProperty.jsx'
import MailList from '../../components/mailList/MailList.jsx'
import Footer from '../../components/footer/Footer.jsx'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <h1 className="homeTitle">Browsw By Property</h1>
      <Featured/>

      <h1 className="homeTitle">Browse by property type</h1>

      <PropertyList/>
      <h1 className="homeTitle">Home Guest Love</h1>

      <FeaturedProperties/>

      <MailList/>
      <Footer/>
    </div>
  )
}

export default Home