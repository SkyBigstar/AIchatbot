import { useState } from "react";
import axios from "axios";
import { environment } from "../../environment";
import { useNavigate } from "react-router-dom";



const FileUploadMultiple = () => {
  const BASE_URL = environment.BASE_URL;
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isTraining, setIsTraining] = useState(false);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (files.length==0) {
      alert("Choose PDF files!");
      return;
    }
    let countSize = 0;
    let formData = new FormData();
   // formData.append("length", files.length);

   for (let i = 0; i < files.length; i++) {
      countSize += files[i].size;
      formData.append("files", files[i]);
    }
    console.log(countSize)
      setIsTraining(true); // Set loading indicator to true
      axios
        .post(`${BASE_URL}/api/users/upload_documents/`, formData, {
          headers: {
            "Content-type": "multipart/form-date",
          }
        })
        .then((res) => {
          if (res.status === 200) {
            navigate("/chatbot");
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(()=> {
          setIsTraining(false);
        })
  };

  return (
    <div>
      <div className="upload_container">
        <form onSubmit={handleUpload}>
          <label className="custom-file-upload">
            Choose Files
            <i className="fa fa-upload"></i>
            <input type="file" accept="application/pdf" multiple onChange={handleChange} />
          </label>
          <button type="submit" disabled={isTraining}>
            {isTraining ? "Training in progress..." : "Train"}
          </button>
        </form>
      </div>
      {isTraining && <p>Training in progress. Please wait ...</p>}
    </div>
  );
};
export default FileUploadMultiple;
