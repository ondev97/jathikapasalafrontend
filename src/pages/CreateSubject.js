import React, { useState } from "react";
import UseCreateSubject from "../utils/hooks/UseCreateSubject";
import ThreeStepSection from "../components/ThreeStepSection";
import CreateSubjectForm from "../components/CreateSubjectForm";
import CropImages from "../utils/hooks/CropImages";
import Axios from "axios";
import { useSelector } from "react-redux";
import { store } from "react-notifications-component";
import { Redirect } from "react-router-dom";
import "../assets/css/creatsubject.css";
import "../assets/css/mediaFiles/createsubmedia.css";

export default function CreateSubject() {
  const {
    formValue,
    hadelChabgeFormValues,
    handelSubmit,
    formErrors,
    hide,
    hideError,
  } = UseCreateSubject(submitForm); //custom hook
  const [image, getCropData, setCropper, onChange, cropData, err, file] =
    CropImages(); //custom hook
  const [redirec, setredirec] = useState(null);
  const [uploading, setuploading] = useState(false);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  //function for base64 to blob
  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  function submitForm() {
    let formData = new FormData();

    if (cropData !== "#") {
      let input = cropData.split(",")[1];
      const blob = b64toBlob(input, file.type);
      formData.append("subject_cover", blob, file.name);
    }
    console.log(formValue);
    formData.append("subject_name", formValue.subject_title);
    formData.append("short_description", formValue.subject_shdes);
    formData.append("description", formValue.sub_des);
    formData.append("class_type", formValue.class_type);
    formData.append("subject_type", formValue.subject_type);
    formData.append("medium", formValue.subject_medium);

    Axios.post(
      `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/createsubject/${usDetails.id}/`,
      formData,
      {
        headers: { Authorization: "Token " + usDetails.key },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.isTrusted) {
            setuploading(true);
          }
        },
      }
    )
      .then((res) => {
        setuploading(false);
        //showing alert
        store.addNotification({
          title: "Subject Created!",
          message: "Jathikapasala",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true,
          },
          width: 600,
        });
        setredirec({ id: res.data.id });
      })
      .catch((e) => {});
  }

  if (redirec) {
    return <Redirect to={`/teacherdashboard/createcourse/${redirec.id}`} />;
  }

  return (
    <div className="subject_form">
      <ThreeStepSection set="cs" />
      <div className="main_form">
        <h1>Create Subject</h1>
        <CreateSubjectForm
          formValue={formValue}
          hadelChabgeFormValues={hadelChabgeFormValues}
          handelSubmit={handelSubmit}
          formErrors={formErrors}
          hide={hide}
          hideError={hideError}
          image={image}
          getCropData={getCropData}
          setCropper={setCropper}
          onChange={onChange}
          cropData={cropData}
          err={err}
          uploading={uploading}
        />
      </div>
    </div>
  );
}
