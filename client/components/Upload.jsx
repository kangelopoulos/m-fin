import React, { useEffect } from "react";
import { useDropzone } from "React-dropzone";
import '../styles/drag.scss';

function Upload({ open }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
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
  );
}

export default Upload;