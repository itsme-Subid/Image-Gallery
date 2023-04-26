import React from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import styled from "styled-components";

const DropzoneStyled = styled.div`
  border: 2px dashed #ccc;
  border-radius: 0.5rem;
  padding: 2rem;
  margin: 2rem 0;
  cursor: pointer;
  & .dropzone-content {
    font-size: 1.5rem;
    font-weight: 500;
    color: #ccc;
  }
  & .dropzone-input {
    display: none;
  }
`;

const Dropzone = ({ onDrop }: { onDrop: (acceptedFiles: File[]) => void }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  return (
    <DropzoneStyled className="dropzone-div" {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">
            Drag n drop some files here, or click to select files
          </p>
        )}
      </div>
    </DropzoneStyled>
  );
};

export default Dropzone;
