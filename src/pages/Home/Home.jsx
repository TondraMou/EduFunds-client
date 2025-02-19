import { Helmet } from "react-helmet-async";

import TopScholarship from "./TopScholarship";
import Banner from "./Banner";
import Statics from "./Statics";
import FAQ from "./FAQ";
import AllReview from "./AllReview";
import About from "./About";
import PartnerInstitutions from "./PartnerInstitutions";
import ScholarshipAnnouncements from "./ScholarshipAnnouncements";


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>EduFunds | Home</title>
      </Helmet>
      <Banner></Banner>
      <ScholarshipAnnouncements></ScholarshipAnnouncements>
      <About></About>
      <Statics></Statics>
      <TopScholarship></TopScholarship>
      <PartnerInstitutions></PartnerInstitutions>
      <FAQ></FAQ>
      <AllReview></AllReview>
     
    </div>
  );
};

export default Home;