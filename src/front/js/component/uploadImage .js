import React, { useState } from "react";

function UploadImage(props) {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  console.log(props.user.name);
  return (
    <div className="App">
      <input type="file" onChange={handleChange} />
      <img src={file} />
    </div>
  );
}

export default UploadImage;
