// checked
import React from "react";
import { Link, useLocation,  } from "react-router-dom";
import home from '../images/home.png';
import back from '../images/back.png';
import revers from '../images/revers.png';
import profile from '../images/profile.png';
import add from '../images/add.png';
import IsAdminContext from "../contexts/isAdminContext";
import { ADD_WORD_PAGE, MAINPAGE, PROFILE_PAGE } from "../utils/constants";

function Header ({ reverseStatus, handleReverseStatus, isLoggedIn }) {
  const location = useLocation();
  const isAdmin = React.useContext(IsAdminContext);

  const goBack = () => {
      window.history.back();
  };

  const handleReverseWords = () => {
    handleReverseStatus(!reverseStatus);
  }

  return(
    <header className="header">
      <Link to={MAINPAGE}>
        <img src={home} alt="Main Page" className="header__img"/>
      </Link>
      <img src={back} alt="Back" className={ location.pathname === MAINPAGE || !isLoggedIn ? 'hidden' : 'header__img' } onClick={goBack}/>
      <img src={revers} alt="Reverse Word" className={ location.pathname === '/lesson' ? 'header__img' : 'hidden' } onClick={handleReverseWords}/>
      <Link to={PROFILE_PAGE}>
        <img src={profile} alt="Profile" className={ isLoggedIn ? 'header__img' : 'hidden' }/>
      </Link>
      <Link to={ADD_WORD_PAGE}>
        <img src={add} alt="Add data" className={ isLoggedIn && isAdmin ? 'header__img' : 'hidden' }/>
      </Link>
    </header>
  );
};

export default Header;