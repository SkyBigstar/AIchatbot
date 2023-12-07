import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import { Button, Form } from "react-bootstrap";
import "./training.scss";
import { useState } from "react";
import axios from "axios";
import { useRef, useEffect } from "react";
import { UploadFile, FiberManualRecord, WebAsset } from "@mui/icons-material";
import FileUploadMultiple from "components/uploading/UploadFile";
import { environment } from "environment";



export const Training = () => {
  const BASE_URL = environment.BASE_URL;
  return (
    <div className="training">
      <Sidebar />
      <div className="trainingContainer">
        <Navbar title="Training" />

        <div className="training_content">
          <h1>Train the model with new data</h1>
          <FileUploadMultiple />
        </div>
      </div>
    </div>
  );
};
