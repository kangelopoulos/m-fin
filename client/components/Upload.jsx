import React, { useEffect } from "react";
import { useDropzone } from "React-dropzone";
import Button from '@mui/material/Button';
import axios from "axios";
import '../styles/drag.scss';

function Upload({ setFile }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const files = acceptedFiles.map((file) => (
    <li className="file" key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  const processFile = async (e) => {
    e.preventDefault();
    setFile(acceptedFiles[0]);
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