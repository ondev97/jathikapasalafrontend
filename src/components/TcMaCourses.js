import Axios from "axios";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function TcMaCourses({
  id,
  subject_name,
  subject_cover,
  author,
  created_at,
  short_description,
  class_type,
  subject_type,
}) {
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const clk = () => {
    let choose = window.confirm("Are You Sure?");

    if (choose) {
      Axios.delete(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/deletesubject/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      ).then(() => {
        window.location.reload(false);
      });
    }
  };

  return (
    <div className="course_card">
      <div className="cscard_head">
        <Link to={`/teacherdashboard/viewcourse/${id}`}>
          <LazyLoadImage
            src={`${subject_cover}`}
            alt=""
            effect="blur"
            height="100%"
          />
        </Link>
        <div className="cos_options">
          <h3>
            <i className="fas fa-chevron-circle-up"></i>
          </h3>
          <div className="options_body">
            <ul>
              <li onClick={clk}>Delete</li>
              <Link to={`/teacherdashboard/updatesubject/${id}`}>
                <li>Edit</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <Link to={`/teacherdashboard/viewcourse/${id}`}>
        <div className="cscard_body">
          <div className="cscard_mid">
            <h2>{subject_name}</h2>
            <h3>{short_description}</h3>
            <div className="ty">
              <h4>
                <i className="fas fa-graduation-cap"></i>
                {class_type}
              </h4>
              <h5>
                <i className="fas fa-language"></i>
                {subject_type}
              </h5>
              <h5>
                <i className="fas fa-school"></i>
                {subject_type}
              </h5>
            </div>
          </div>
        </div>
        <div className="cscard_bottom">
          <h4>
            By:
            {author.user.first_name && author.user.last_name
              ? author.user.first_name + " " + author.user.last_name
              : ""}
          </h4>
          {created_at && (
            <h4>
              <ReactTimeAgo date={Date.parse(created_at)} locale="en-US" />
            </h4>
          )}
        </div>
      </Link>
    </div>
  );
}
