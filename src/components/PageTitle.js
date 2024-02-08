import { useLocation } from "react-router-dom";

const { useRef, useEffect } = require("react");
const { DEPARTMENTS_TITLE, DEPARTMENTS_TITLE_CN, MAINPAGE, LESSONS_TITLE, LESSONS_TITLE_CN } = require("../utils/constants");

function PageTitle () {
  const location = useLocation();
  const currentPath = location.pathname;
  const titleRef = useRef();
  const defaultTitle = currentPath === MAINPAGE ? DEPARTMENTS_TITLE : LESSONS_TITLE;

  useEffect(() => {
    titleRef.current.addEventListener('mouseenter', () => {
      titleRef.current.textContent = currentPath === MAINPAGE ? DEPARTMENTS_TITLE_CN : LESSONS_TITLE_CN;
    })
    titleRef.current.addEventListener('mouseleave', () => {
      titleRef.current.textContent = currentPath === MAINPAGE ? DEPARTMENTS_TITLE : LESSONS_TITLE;
    })
  }, []);


  return (
    <div className="page__title">
      <p className="page__title_txt" ref={titleRef}>{defaultTitle}</p>
    </div>
  )
}

export default PageTitle;