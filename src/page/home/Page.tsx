import { AboutMe } from "./view/AboutMe";
import { Favorite } from "./view/Favorite";
import { GetStarted } from "./view/GetStarted";
export const Home = () => {
  return (
    <div className="w-full">
      <GetStarted />
      <AboutMe />
      <Favorite/>
    </div>
  );
};
