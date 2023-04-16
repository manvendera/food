import { useRef, useEffect, useState } from "react";

function replaceVal(val) {
  let retur = val.replace(/[^a-zA-Z0-9]/g, "");
  // console.log("regexed val---", retur);
  return retur;
}

function scrollToSection(setIsMenuClicked) {
  if (setIsMenuClicked) setIsMenuClicked(false);
  {
    //console.log("event.target.hash", `${CSS.escape(event.target.hash)}`);
    event.preventDefault();

    const navbarHeight = document.querySelector("nav").offsetHeight;

    const section = document.querySelector(event.target.hash);
    console.log("h22s", section);
    const sectionTop = section.offsetTop - 300;
    // console.log("height diff",navbarHeight,section,sectionTop)
    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }
}

const NavBar = ({
  filteredRestaurant,
  menuButton,
  isMenuClicked,
  setIsMenuClicked,
  changedByHandler,
}) => {
  const ref = useRef();

  useEffect(() => {
    // let isMenuClicked = isMenuClicked;

    let handler = (e) => {
      console.log(
        "reached mouseDown",
        isMenuClicked,
        isMenuClicked && !ref?.current?.contains(e.target)
      );
      if (isMenuClicked && !ref?.current?.contains(e.target)) {
        console.log("navbar closed the menu");
        setIsMenuClicked(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`flex  flex-col container  w-full ${
        !menuButton ? "mt-16 mr-10" : "h-full "
      }`}
    >
      <nav
        className={`flex flex-col p-2 align-middle justify-center shadow-2xl bg-white w-full   border-2 border-black items-center content-center ${
          menuButton ? "h-full rounded-2xl " : "h-auto"
        }`}
      >
        {Object.keys(filteredRestaurant).map((rs) => {
          // console.log("reached", rs);
          return (
            <ul className="my-3 ">
              <li className="">
                <a
                  className=" font-medium font-serif text-lg text-blue-600 "
                  href={"#" + replaceVal(rs)}
                  onClick={(event) =>
                    menuButton
                      ? scrollToSection(setIsMenuClicked)
                      : scrollToSection()
                  }
                >
                  {rs}
                </a>
              </li>
            </ul>
          );
        })}
      </nav>
    </div>
  );
};

export default NavBar;
