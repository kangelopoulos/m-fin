import React, { useState } from "react";
import Upload from '../components/Upload.jsx';
import Uploads from "./Uploads.jsx";
import Payments from "./Payments.jsx";
import '../styles/global.scss';

const HomePage = () => {
  const [payments, setPayments] = useState("");
  const approve = () => {

  }
  return (
    <div>
      {
        payments.length === 0 ? 
        <>
          <h1 className="title">Dunkin Dashboard</h1>
          <Upload setPayments={setPayments}/>
          <h2 className="title">Previous Uploads</h2>
          <Uploads />
        </>
        :
        <Payments data={payments}/> 
      }
    </div>
  )
}

export default HomePage;