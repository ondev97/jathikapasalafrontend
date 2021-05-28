import ReactTimeAgo from "react-time-ago";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function MySubjectsCard({
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

  return (
    <div className="al_sub_card">
      <Link to={`/studentdashboard/mycoursesforsubject/${id}`}>
        <div className="sub_card_row">
          <div className="image_sub">
            <LazyLoadImage effect="blur" src={`${subject_cover}`} alt="" />
          </div>
          <div className="sub_ins_pro">
            <div className="ins_outer">
              <LazyLoadImage
                effect="blur"
                src={`${author.profile_pic}`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="sub_card_row">
          <h3>{subject_name}</h3>
          <p>{short_description}</p>
          <div className="sub_type">
            <ul>
              <li>
                <i className="fas fa-graduation-cap"></i>
                {subject_type}
              </li>
              <li>
                <i className="fas fa-language"></i>
                {class_type}
              </li>
              <li>
                <i className="fas fa-school"></i>
                {class_type}
              </li>
            </ul>
          </div>
        </div>
        <div className="sub_card_row">
          <h3>
            By:
            {author.user.first_name && author.user.last_name
              ? author.user.first_name + " " + author.user.last_name
              : ""}
          </h3>
          <div className="al_sub_time">
            <h3>
              <ReactTimeAgo date={Date.parse(created_at)} locale="en-US" />
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
