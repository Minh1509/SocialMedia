import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function PhotoUploader({ userId }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        throw new Error("Please select a file.");
      }

      const formData = new FormData();
      formData.append("photo", file);
      formData.append("userId", userId);
      
      const response = await axios.post(
        "http://localhost:8081/api/photo/new",
        formData
      );

      if (!response.data) {
        throw new Error("Failed to upload photo");
      }

      console.log("Photo uploaded successfully!");
      navigate(`/photos/${userId}`);
    } catch (error) {
      console.error("Error uploading photo:", error.message);
    }
  };

  return (
    <div className="photo-uploader-container">
      <input
        type="file"
        onChange={handleFileChange}
        className="photo-uploader-input"
      />
      <button onClick={handleUpload} className="photo-uploader-button">
        Upload Photo
      </button>
    </div>
  );
}

export default PhotoUploader;
