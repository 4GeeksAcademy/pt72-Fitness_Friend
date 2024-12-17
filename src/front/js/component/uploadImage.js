import React, { useState } from "react";

function UploadImage(props) {
  const [file, setFile] = useState();
  // function handleChange(e) {
  //   const imageObjectToString = `${e.target.files[0]}`
  //   console.log(typeof e.target.files[0], "here's the e.targetFiles")
  //   localStorage.setItem("imageData", imageObjectToString)
  //   const imageData = localStorage.getItem("imageData")
  //   const imageDataToObject = JSON.parse(imageData)
  //   setFile(URL.createObjectURL(imageDataToObject));
  //   // console.log(imageDataToObject, "this is an image");
  // }
  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      localStorage.setItem("imageData", fileUrl);
      setFile(fileUrl);
    }
  }
  
  console.log(file, "this is a file");
  return (
    <div className="App">
      <input type="file" onChange={handleChange} />
      <img src={file} />
    </div>
  );
}

export default UploadImage;
