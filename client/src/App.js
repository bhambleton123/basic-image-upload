import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState([]);

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  const submitFile = () => {
    let formData = new FormData();
    formData.append("image", files[0]);
    axios
      .post("/api/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setImages([...images, res.data]);
      })
      .catch((err) => console.error(err.response));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "300px",
        }}
      >
        <p>Image upload</p>
        <input
          style={{ marginBottom: "30px" }}
          type="file"
          className="type"
          onChange={onChange}
        />

        <button onClick={submitFile}>Submit</button>
      </div>
      {images.map((image) => (
        <img src={image} />
      ))}
    </div>
  );
}
