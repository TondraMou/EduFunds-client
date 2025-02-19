import { Helmet } from "react-helmet-async";

import TopScholarship from "./TopScholarship";
import Banner from "./Banner";
import Statics from "./Statics";
import FAQ from "./FAQ";
import AllReview from "./AllReview";


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>EduFunds | Home</title>
      </Helmet>
      <Banner></Banner>
      <Statics></Statics>
      <TopScholarship></TopScholarship>
      <FAQ></FAQ>
      <AllReview></AllReview>
     
    </div>
  );
};

export default Home;