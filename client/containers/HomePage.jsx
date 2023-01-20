import React, { useEffect, useState } from "react";
import Upload from '../components/Upload.jsx';
import Uploads from "./Uploads.jsx";
import Payments from "./Payments.jsx";
import '../styles/global.scss';
import axios from "axios";

const HomePage = () => {
  const [payments, setPayments] = useState("");
  const [file, setFile] = useState(new Blob());
  
  useEffect(() => {
    const reader = new FileReader();
    reader.readAsText(file); 
    reader.onloadend = e => {
      const xml = e.target.result;
      setPayments(xml);
    }
  }, [file]);

  const cancel = () => {
    setPayments("");
  }

  const approve = async () => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post('/upload/', formData, { 
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
  };

  return (
    <div>
      {
        payments.length === 0 ? 
        <>
          <h1 className="title">Dunkin Dashboard</h1>
          <Upload setFile={setFile}/>
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