import React from "react";
import { useContext } from "react";
import { Context } from "../context/Context";
export default function ScrollBtn() {
  const { isScrolled, setIsScrolled } = useContext(Context);
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      console.log(isScrolled);
    });
  }, []);
  function handleTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className={`arrow-top ${isScrolled ? "visible":"hidden"}`} onClick={handleTop}>
      <i className="fa-solid fa-arrow-up"></i>
    </div>
  );
}
