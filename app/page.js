import Image from "next/image";
import HeroSection from "./Components/Hero";
import EditorialNavbar from "./Components/NavBar";
import StatsGridSection from "./Components/StatsGridSection";
import ProgramExplorer from "./Components/ProgramExplorer";
import AdmissionsRoadmap from "./Components/AdmissionRoadmap";
import PlacementRoster from "./Components/PlacementRoaster";
import IndustrialFooter from "./Components/Footer";

export default function Home() {
  return (
    <>
          <HeroSection/>
          <EditorialNavbar/>
          <StatsGridSection/>
          <ProgramExplorer/>
          <AdmissionsRoadmap/>
          <PlacementRoster/>
          <IndustrialFooter/>
          </>
  );
}
