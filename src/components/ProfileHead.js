import React, { useState } from "react";
import "../assets/css/usprofile.css";
import UploadPropicModel from "./UploadPropicModel";
import AcDetails from "../utils/hooks/AcDetails";
import { store } from "react-notifications-component";
import CropImages from "../utils/hooks/CropImages";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function ProfileHead() {
  const [showModel, setshowModel] = useState(false);
  const [filePath, setfilePath] = useState("");
  const [imgObjectURL, setimgObjectURL] = useState("");
  const [
    image,
    getCropData,
    setCropper,
    onChange,
    cropData,
    err,
    setImage,
    setCropData,
  ] = CropImages(); //custom hook

  const openModel = () => {
    setshowModel(!showModel);
  };

  const removeValue = (e) => {
    e.target.value = "";
  };

  const hadelFileUpload = (e) => {
    if (e.target.files[0] && e.target.files[0].name) {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg"
      ) {
        if (e.target.files[0].size <= 1000000) {
          setimgObjectURL(URL.createObjectURL(e.target.files[0]));
          setfilePath(e.target.files[0]);
          openModel();
        } else {
          //setshowModel(!showModel);
          store.addNotification({
            title: "File Should Be Less Than 2mb!",
            message: "Jathikapasala",
            type: "danger",
            insert: "top",
            container: "top-left",
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
        }
      } else {
        setshowModel(!showModel);
        store.addNotification({
          title: "Invalid File Type!",
          message: "Jathikapasala",
          type: "danger",
          insert: "top",
          container: "top-left",
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
      }
    }
  };

  const [teachProfilepic, profileDetails] = AcDetails();

  return (
    <div>
      <UploadPropicModel
        showModel={showModel}
        setshowModel={setshowModel}
        filePath={filePath}
        setfilePath={setfilePath}
        imgObjectURL={imgObjectURL}
        setimgObjectURL={setimgObjectURL}
        image={image}
        getCropData={getCropData}
        setCropper={setCropper}
        cropData={cropData}
        err={err}
        setImage={setImage}
        setCropData={setCropData}
      />
      <div className="profil_box">
        <div className="srow">
          <h2>{`${profileDetails.name} ${profileDetails.lname}`}</h2>
          <p>Instructor</p>
          <div className="srow_pro_pic">
            <LazyLoadImage src={`${teachProfilepic}`} alt="" effect="blur" />
            <label htmlFor="uppic">
              <i className="fas fa-camera"></i>
            </label>
            <input
              type="file"
              id="uppic"
              onChange={(e) => {
                onChange(e);
                hadelFileUpload(e);
              }}
              onClick={removeValue}
            />
          </div>
        </div>
        <div className="brow">
          <div className="brow_info">
            <p>{profileDetails.address}</p>
            <p>
              <i className="fas fa-phone-alt"></i>
              {profileDetails.phoneNumber}
            </p>
          </div>
          {/*<div className="tous">*/}
          {/*  <div className="coscount">*/}
          {/*    <h3>20</h3>*/}
          {/*    <p>Subject</p>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}
