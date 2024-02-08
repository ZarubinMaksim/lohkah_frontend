import { useLocation } from "react-router-dom";
import TestWithFourWords from "./TestWithFourWords";
import { useEffect, useState } from "react";
import TestWithInput from "./TestWithInput";

function Tests ({ currentUser, currentUserDepartment, handleSendResults, setIsUpdated }) {
  const location = useLocation();
  const studyingDepartment = location.state.department;
  const studyingLesson = location.state.lesson;
  const studyingWords = location.state.words;
  const mistakesList = []
  const [isFinished, setIsFinished] = useState(false)

  const dateObject = new Date();
  const year = dateObject.getUTCFullYear()
  const month = dateObject.getUTCMonth() + 1
  const date = dateObject.getUTCDate()
  const testDate = `${year}-${month}-${date}`


  return (
    <div className="tests">
      {isFinished ? (
        <TestWithInput 
          currentUser = {currentUser} 
          currentUserDepartment = {currentUserDepartment} 
          studyingDepartment = {studyingDepartment} 
          studyingLesson = {studyingLesson} 
          studyingWords = {studyingWords} 
          mistakesList={mistakesList} 
          handleSendResults = {handleSendResults}
          testDate = {testDate}
          setIsUpdated = {setIsUpdated}
        />
      ) : (
        <TestWithFourWords 
          currentUser = {currentUser} 
          currentUserDepartment = {currentUserDepartment} 
          studyingDepartment = {studyingDepartment} 
          studyingLesson = {studyingLesson} 
          handleSendResults = {handleSendResults} 
          studyingWords = {studyingWords} 
          mistakesList={mistakesList} 
          onFinish={setIsFinished}
          testDate = {testDate}
          setIsUpdated = {setIsUpdated}
        />
      )}
    </div>
  )
}

export default Tests;