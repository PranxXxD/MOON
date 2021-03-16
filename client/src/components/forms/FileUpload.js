import React from "react";

const FileUpload = () => {
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    //resize
    //send back to server to upload to cloudinary
    //set url to images[] in the parent company - ProductCreate 
  };

  return (
    <div className="row">
      <label className="btn btn-primary btn-raised">
        Choose File
        <input
          type="file"
          hidden
          multiple
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  );
};

export default FileUpload;
