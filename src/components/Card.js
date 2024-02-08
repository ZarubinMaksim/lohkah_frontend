// checked
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import editButton from '../images/edit.png';
import excel from '../images/excel.png';
import deleteButton from '../images/delete.png';
import IsAdminContext from "../contexts/isAdminContext";
import { 
  DELETE_BUTTON_MESSAGE, 
  DELETE_CONFIRMATION_MESSAGE, 
  IS_NOT_EMPTY_MESSAGE, 
  LESSONPAGE, 
  LESSONSPAGE, 
  MAINPAGE, 
  UPDATE_BUTTON_MESSAGE 
} from "../utils/constants";

function Card ({ 
  title, 
  departmentData, 
  lessonData, 
  currentDepartment, 
  handleDeleteDepartment, 
  handleDeleteLesson, 
  handleUpdateDepartment, 
  handleUpdateLesson, 
  setIsTestResultsRequested,
  isTestsResultsRequested,
  testResults,
  createExelFile,
  onChange 
}) {

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const titleRef = useRef();
  const cardRef = useRef();
  const isAdmin = React.useContext(IsAdminContext); //ADMIN CONTEXT
  const [isChanging, setIsChanging] = useState(false); //toggle isChanging while clicking update button
  const [isDelete, setIsDelete] = useState(false); //toggle isDelete while clicking delete button
  const [isEmpty, setIsEmpty] = useState(false); //toggle isEmpty if clicked card [] empty to provide EMPTY message
  const [noDeleteToggle, setNoDeleteToggle] = useState(false); //hepls to manage EMPTY msg and DefaultCardTemplate

  // CARD MESSAGE TIMER
  function setTimer(func, status) {
    setTimeout(() => {
      func(status);
    }, 1000);
  };

  // CARD CLICK FUNCTION
  function handleClick() {
    if (currentPath === MAINPAGE) {
      if (departmentData.lessons.length === 0) {
        setIsEmpty(true);
        setTimer(setIsEmpty, false);
      } else {
        navigate(LESSONSPAGE, { state: { departmentData: departmentData } })
      };
    } else {
      if (lessonData.words.length === 0) {
        setIsEmpty(true);
        setTimer(setIsEmpty, false);
      } else {
        navigate(LESSONPAGE, { state: { lessonData:lessonData, currentDepartment:currentDepartment } })
      };
    };
  };

  // HANDLE CARD DELETE MESSAGES 
  function manageDeleteClick(path) {
    if (path.length === 0) {
      setIsEmpty(true);
    } else {
      setNoDeleteToggle(true);
      setTimer(setNoDeleteToggle, false);
      setTimer(setIsDelete, false);
    };
  };

  //HANDLE DELETE BUTTON CLICK 
  function onClickDeleteButton() {
    setIsChanging(false);
    setIsDelete(!isDelete);
    if (currentPath === MAINPAGE) {
      manageDeleteClick(departmentData.lessons);
    } else {
      manageDeleteClick(lessonData.words);
    };
  };

  // HANDLE API DELETE
  function handleSubmitDelete () {
    if (currentPath === MAINPAGE) {
      handleDeleteDepartment(departmentData._id);
    } else {
      handleDeleteLesson(currentDepartment._id, lessonData._id);
    };
    setIsDelete(!isDelete);
    setIsEmpty(!isEmpty);
  };

  // HANDLE CHANGE BUTTON CLICK 
  function onClickUpdateButton() {
    setIsDelete(false);
    setIsChanging(!isChanging);
  };

  // HANDLE API UPDATE
  const handleSubmitUpdate = (evt) => {
    evt.preventDefault();
    if (currentPath === MAINPAGE) {
      handleUpdateDepartment(departmentData._id);
      setIsChanging(!isChanging);
    } else {
      handleUpdateLesson(currentDepartment._id, lessonData._id);
      setIsChanging(!isChanging);
    };
  };

  // HANDLE CARD HOVER
  useEffect(() => {
    const cardElement = cardRef.current;
    const titleElement = titleRef.current;
  
    if (cardElement && titleElement) {
      const handleMouseEnter = () => {
        titleElement.classList.add('card__title_active');
      };
  
      const handleMouseLeave = () => {
        titleElement.classList.remove('card__title_active');
      };
  
      cardElement.addEventListener('mouseenter', handleMouseEnter);
      cardElement.addEventListener('mouseleave', handleMouseLeave);
      cardElement.addEventListener('mouseover', handleMouseEnter);
  
      return () => {
        cardElement.removeEventListener('mouseenter', handleMouseEnter);
        cardElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [cardRef, titleRef, isChanging, isDelete]);

  //HANDLE VALIDITY 
  const handleValidity = (e) => {
    const currentElementError = document.querySelector(`#${e.target.id}-error`)
    if (!e.target.validity.valid) {
      currentElementError.classList.add('error__active')
    } 
    if (e.target.validity.valid) {
      currentElementError.classList.remove('error__active')
    }
  };

  // CODE TEMPLATES BELOW

  // form changing template
  const formUpdateTemplate = (
    <form  onSubmit={handleSubmitUpdate}>
      <input type="text" name="cardName" id="cardupdate" onChange={onChange} onInput={handleValidity} minLength={2} maxLength={15}/>
      <p id="cardupdate-error" className="error">Updated title should be more  than 2 symbols</p>
      <button>{UPDATE_BUTTON_MESSAGE}</button>
    </form>
  );

  //default card title 
  const cardDefaultTemplate = (
    <h2 className="card__title" ref={titleRef}>{isEmpty ? (`${title} is empty`) : (title)}</h2>
  );

  // card delete template
  const cardDeleteTemplate = ( 
    isEmpty ? (      
      <>
        <p className="card__informcover">{DELETE_CONFIRMATION_MESSAGE} {title} ?</p>
        <button onClick={handleSubmitDelete}>{DELETE_BUTTON_MESSAGE}</button>
      </>
    ) : (
      <p className="card__informcover">{noDeleteToggle ? (`${title} ${IS_NOT_EMPTY_MESSAGE}`) : (cardDefaultTemplate)}</p>
    )
  );

  const handleDownloadExcel = () => {
    setIsTestResultsRequested(!isTestsResultsRequested)
    if (departmentData) {
      const testResultsByDepartment = testResults.data.filter(function (result) {
        return result.studyingDepartment === departmentData.department
      })
      console.log('444', testResultsByDepartment)
      createExelFile(testResultsByDepartment)
    } else {
      const testResultsByLesson = testResults.data.filter(function (result) {
        return result.studyingLesson === lessonData.lessonName
      })
      createExelFile(testResultsByLesson)
    }
    
  }

  // card delete and change buttons template
  const cardChangeAndDeleteButtons = (
    <>
      <img src={excel} alt="Download Excel file" className="card__manage_icon" onClick={handleDownloadExcel}/>
      <img src={editButton} alt="Update Button" className="card__manage_icon" onClick={onClickUpdateButton}/>
      <img src={deleteButton} alt="Delete Button" className="card__manage_icon" onClick={onClickDeleteButton}/>
    </>
  );

  return (
    <div className="card" ref={cardRef}>
      <div className="card__manage">
        { isAdmin ? (cardChangeAndDeleteButtons) : (null) }
      </div>
      <div className="card__content" onClick={ isChanging || isDelete ? null : handleClick }> 
        { isDelete ? (cardDeleteTemplate) : (
            isChanging ? 
              (formUpdateTemplate) : (cardDefaultTemplate)
          )
        }
      </div>
    </div>
  );
};

export default Card;