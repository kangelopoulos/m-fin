import React from "React";
import { useDropzone } from "React-dropzone";

function Upload({ open }) {
  const { getRootProps, getInputProps } = useDropzone({});

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <div>
        <p>
          Drag and Drop
        </p>
      </div>
    </div>
  );
}

export default Upload;