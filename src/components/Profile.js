import React, { useEffect, useRef, useState } from 'react';
import IsAdminContext from '../contexts/isAdminContext';
import PopUp from './PopUp';

function Profile ({ handleLogOut, currentUser, currentUserDepartment, testResults, setIsTestResultsRequested, isTestsResultsRequested, createExelFile, allUsers, allDepartments, popupRequest, setPopupRequest }) {

const isAdmin = React.useContext(IsAdminContext);
const [isPopupOpened, setIsPopupopened] = useState(false)
const [transferingData, setTransferingData] = useState([])
const [popupName, setPopupName] = useState()

  const getResults = () => {
    setIsTestResultsRequested(!isTestsResultsRequested);
    createExelFile(testResults.data); 
  }

  const openPopupWithUsers = () => {
    setIsPopupopened(true)
    setTransferingData(allUsers.data)
    setPopupName('name')
  }

  const openPopupWithuDepartments = () => {
    setIsPopupopened(true)
    setTransferingData(allDepartments)
    setPopupName('department')
  }
  return(
    <div className="profile">
      <h2 className="profile__name">Welcome, {currentUser}!</h2>
      <p>Name: {currentUser}</p>
      <p>Department: {currentUserDepartment}</p>
      {isAdmin ? (
        <div className='profile__results_container'>
          <div className='profile__result' onClick={getResults}>
            <p>All results</p>
          </div>
          <div className='profile__result' onClick={openPopupWithUsers}>
            <p>Results by Users</p>
          </div>
          <div className='profile__result' onClick={openPopupWithuDepartments}>
            <p>Results by Departments</p>
          </div>
      </div>
      ) : (null)}
      <PopUp 
        setPopupRequest = {setPopupRequest}
        setIsTestResultsRequested = {setIsTestResultsRequested}
        popupRequest = {popupRequest}
        isTestsResultsRequested = {isTestsResultsRequested}
        testResults = {testResults}
        createExelFile = {createExelFile}
        isPopupOpened = {isPopupOpened}
        setIsPopupopened = {setIsPopupopened}
        transferingData = {transferingData}
        popupName = {popupName}
      />
      <button className="profile__logout" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Profile;

