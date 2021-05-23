import React from "react";
import "../assets/css/notFound.css";
import notFound from "../img/404.svg";

export default function NotFound() {
  return (
    <div>
      <div className="title">
        <h1>Page Not Found</h1>
      </div>
      <div className="bodySvg">
        <img src={notFound} alt="notFound" />;
      </div>
    </div>
  );
}
