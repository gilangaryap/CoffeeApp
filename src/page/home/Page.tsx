import { AboutMe } from "./view/AboutMe";
import { Favorite } from "./view/Favorite";
import { GetStarted } from "./view/GetStarted";
import StoreMap from "./view/StoreMap";
import { Testimonial } from "./view/Testimonial";
export const Home = () => {
  return (
    <div>
      <GetStarted />
      <AboutMe />
      <Favorite/>
      <StoreMap/>
      <Testimonial/>
    </div>
  );
};
