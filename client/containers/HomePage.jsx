import React, { useState } from "react";
import Upload from '../components/Upload.jsx';
import Uploads from "./Uploads.jsx";
import Payments from "./Payments.jsx";
import '../styles/global.scss';
import axios from "axios";

const HomePage = () => {
  const [payments, setPayments] = useState("");

  const cancel = () => {
    setPayments("");
  }

  const approve = () => {
    const res = axios.post('/uploads/', { 
      payments: payments
    })
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
        <Payments cancel={cancel} approve={approve} data={payments}/> 
      }
    </div>
  )
}

export default HomePage;