import "../../assets/css/student/stallsubjects.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import useDebounce from "../../utils/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MySubjectsCard from "../../components/student/MySubjectCard";
import ProfileLoader from "../../components/ProfileLoader";
import Empty from "../../components/Empty";

export default function StudentMainDashboard() {
  const [subDetails, setsubDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [nextPage, setnextPage] = useState(null);
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const debounce = useDebounce(); //custom hook
  const url = `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/mysubjects_stu`;

  useEffect(() => {
    if (search === "") {
      const fetchurl = `${url}/?page=${page}`;
      getSubjectDetails(fetchurl);
    } else {
      const fetchurl = `${url}/`;
      getSubjectDetails(fetchurl);
    }
  }, [usDetails, page, search]);

  const getSubjectDetails = async (fetchurl) => {
    setisLoading(true);
    if (usDetails.key) {
      await Axios.get(fetchurl, {
        headers: { Authorization: "Token " + usDetails.key },
      })
        .then((res) => {
          setisLoading(false);
          setsubDetails([...res.data]);
        })
        .catch((err) => {
          if (err.response.data) {
          }
        });
    }
  };

  function next() {
    if (nextPage) {
      setpage(page + 1);
    }
  }

  const handelSearchSubject = (e) => {
    const search = e.target.value;
    setpage(1);
    debounce(() => setsearch(search), 500);
  };

  return (
    <>
      <div className="all_st_subs">
        <div className="pagetop">
          <h1>MY SUBJECTS</h1>
          <div className="search_row">
            <input
              type="text"
              name="search"
              placeholder="Search Subject"
              onChange={handelSearchSubject}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        {subDetails.length !== 0 ? (
          <div className="">
            <InfiniteScroll
              dataLength={subDetails.length}
              hasMore={true}
              className="all_sub_body"
            >
              {subDetails.map((det) => (
                <MySubjectsCard
                  key={det.id}
                  id={det.id}
                  subject_name={det.subject_name}
                  subject_cover={det.subject_cover}
                  author={det.author}
                  created_at={det.created_at}
                  description={det.description}
                  short_description={det.short_description}
                  class_type={det.class_type}
                  subject_type={det.subject_type}
                  subject_medium={det.medium}
                />
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <Empty />
        )}
        {isLoading && <ProfileLoader />}
      </div>
    </>
  );
}
