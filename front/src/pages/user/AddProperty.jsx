import React from 'react'
import Footer from '../../components/shared/footer/Footer';
import Header from '../../components/shared/header/Header';
import AddProperty from "../../components/user/AddProperty/AddProperty"

const addProperty = () => {
    return (
      <>
        <Header />
  
        <AddProperty />
  
        <Footer />
      </>
    );
  };

export default addProperty