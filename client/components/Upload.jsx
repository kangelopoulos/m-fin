import React, { useEffect } from "react";
import { useDropzone } from "React-dropzone";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import '../styles/drag.scss';

function Upload({ open }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const navigate = useNavigate();
  const files = acceptedFiles.map((file) => (
    <li className="file" key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  const processFile = (e) => {
    e.preventDefault();
    navigate('/payments');
  };

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input" {...getInputProps()} />
        <div className="outer-input">
          <p className="inner-input">
            Upload XML
          </p>
        </div>
        <ul className="file-list">
          {files}
        </ul>
      </div>
    {
      acceptedFiles.length > 0 ?
      <Button onClick={processFile}>Process File</Button> :
      <></>
    }
    </div>
  );
}

export default Upload;