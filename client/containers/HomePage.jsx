import React from "react";
import Upload from '../components/Upload.jsx';
import Uploads from "../components/Uploads.jsx";
import '../styles/global.scss';

const HomePage = () => {
  return <div>
    <h1 className="title">Dunkin Dashboard</h1>
    <Upload />
    <h2 className="title">Previous Uploads</h2>
    <Uploads />
  </div>
}

export default HomePage;