import "../../assets/css/student/stallsubjects.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import useDebounce from "../../utils/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SubjectsCard from "../../components/student/SubjectsCard";
import "../../assets/css/mediaFiles/allsubjectmedia.css";
import ProfileLoader from "../../components/ProfileLoader";
import Empty from "../../components/Empty";

export default function StAllSubjects() {
  const [subDetails, setsubDetails] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [nextPage, setnextPage] = useState(null);
  const [search, setsearch] = useState("");
  const [medium, setmedium] = useState("");
  const [grade, setgrade] = useState("");
  const [page, setpage] = useState(1);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const debounce = useDebounce(); //custom hook
  const url = `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/subjectlist`;

  useEffect(() => {
    if (search === "" && medium === "" && grade === "") {
      const fetchurl = `${url}/?page=${page}`;
      getSubjectDetails(fetchurl);
    } else {
      const fetchurl = `${url}/?page=${page}&search=${search}&grade=${grade}&medium=${medium}`;
      getSubjectDetails(fetchurl);
    }
  }, [usDetails, page, search, grade, medium]);

  const getSubjectDetails = async (fetchurl) => {
    setisLoading(true);
    if (usDetails.key) {
      await Axios.get(fetchurl, {
        headers: { Authorization: "Token " + usDetails.key },
      })
        .then((res) => {
          setisLoading(false);
          if (page > 1) {
            setsubDetails([...subDetails, ...res.data.results]);
          } else {
            setsubDetails([...res.data.results]);
          }
          setnextPage(res.data.next);
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
    const name = e.target.name;
    if (name === "Grade") {
      const grade = e.target.value;
      debounce(() => setgrade(grade), 500);
    } else if (name === "medium") {
      const medium = e.target.value;
      debounce(() => setmedium(medium), 500);
    } else {
      debounce(() => setsearch(search), 500);
    }
    setpage(1);
  };

  return (
    <>
      <div className="all_st_subs">
        <div className="pagetop editep">
          <div className="search_row edited">
            <select type="text" name="medium" onChange={handelSearchSubject}>
              <option value="">SELECT MEDIUM</option>
              <option value="English">English</option>
              <option value="Sinhala">සිංහල</option>
              <option value="Tamil">தமிழ்</option>
            </select>
            <select type="text" name="Grade" onChange={handelSearchSubject}>
              <option value="">SELECT GRADE</option>
              <option value="Grade 1">Grade 01</option>
              <option value="Grade 2">Grade 02</option>
              <option value="Grade 3">Grade 03</option>
              <option value="Grade 4">Grade 04</option>
              <option value="Grade 5">Grade 05</option>
              <option value="Grade 6">Grade 06</option>
              <option value="Grade 7">Grade 07</option>
              <option value="Grade 8">Grade 08</option>
              <option value="Grade 9">Grade 09</option>
              <option className="optionS" disabled>
                O/L
              </option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option className="optionS" disabled>
                A/L
              </option>
              <option value="Grade 12">Grade 12</option>
              <option value="Grade 13">Grade 13</option>
            </select>
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

        {subDetails.length > 0 ? (
          <div className="">
            <InfiniteScroll
              dataLength={subDetails.length}
              next={next}
              hasMore={true}
              className="all_sub_body"
            >
              {subDetails.map((det) => (
                <SubjectsCard
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
        ) : isLoading ? (
          <ProfileLoader />
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}
