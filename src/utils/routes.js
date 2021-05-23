import Home from "../pages/Home";
import InAllSubjects from "../pages/InAllSubjects";
import IndexAllTeachers from "../pages/IndexAllTeachers";
import StLogin from "../pages/StLogin";
import StSignUp from "../pages/StSignUp";
import StudentDashBoard from "../pages/student/StudentDashBoard";
import TeacherDashboard from "../pages/TeacherDashboard";
import PasswordReset from "../pages/PasswordReset";
import Features from "../pages/Features";
import Guidelines from "../pages/Guidelines";
import NotFound from "../pages/NotFound";

export default [
  {
    path: "/",
    exact: true,
    components: () => <Home />,
  },
  ,
  /*{
    path: "/about",
    components: () => <About />,
  } {
        path:'/contact',
        components: () =><ContactUs/>
    },*/ {
    path: "/features",
    components: () => <Features />,
  },
  {
    path: "/guidelines",
    components: () => <Guidelines />,
  },
  {
    path: "/allteachers",
    components: () => <IndexAllTeachers />,
  },
  {
    path: "/allsubjects",
    components: () => <InAllSubjects />,
  },
  {
    path: "/stlogin",
    components: () => <StLogin />,
  },
  {
    path: "/stsignup",
    components: () => <StSignUp />,
  },
  {
    path: "/teacherdashboard",
    components: () => <TeacherDashboard />,
  },
  {
    path: "/studentdashboard",
    components: () => <StudentDashBoard />,
  },
  {
    path: "/passwordreset",
    components: () => <PasswordReset />,
  },
  {
    components: () => <NotFound />,
  },
];
