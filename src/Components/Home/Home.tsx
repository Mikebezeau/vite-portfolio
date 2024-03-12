import About from "./About";
import Introduction from "./Introduction";
import ProfilePic from "./ProfilePic";
import ProgressBar from "./ProgressBar";
import Services from "./Services";

function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="col-span-2 pt-5 lg:pr-16">
        <Introduction />
        <About />
        <Services />
      </div>
      <div className="hidden lg:block">
        <ProgressBar />
        <ProfilePic />
      </div>
    </div>
  );
}

export default Home;
