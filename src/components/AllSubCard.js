import React from "react";
import ReactTimeAgo from "react-time-ago";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function AllSubCard({ subject }) {
  return (
    <div className="subject_in_cards">
      <div className="subject_head">
        <div className="subject_img">
          <LazyLoadImage
            src={`${subject.subject_cover}`}
            alt="subjects"
            effect="blur"
          />
        </div>
        <div className="teach_img">
          <LazyLoadImage
            src={`${subject.author.profile_pic}`}
            alt="child"
            effect="blur"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <div className="subject_body">
        <h2>{subject.subject_name}</h2>
        <p>
          {subject.author.user.first_name + " " + subject.author.user.last_name}
        </p>
        <div className="row_sim">
          {/*<h3><i className="far fa-user"></i>500 Students</h3>*/}
          <h3>
            <i className="fas fa-graduation-cap"></i>
            {subject.class_type.toUpperCase()}
          </h3>
          <h3>
            <i className="fas fa-language"></i>
            English
          </h3>
        </div>
      </div>
      <div className="subject_tail">
        <p>
          <i className="far fa-clock"></i>
          <ReactTimeAgo date={Date.parse(subject.created_at)} locale="en-US" />
        </p>
      </div>
    </div>
  );
}
