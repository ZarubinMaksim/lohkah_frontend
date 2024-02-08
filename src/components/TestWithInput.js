import { useState } from "react";
import { Link } from "react-router-dom";
import { MAINPAGE } from "../utils/constants";

function TestWithInput ({  
  currentUser,
  currentUserDepartment,
  studyingDepartment,
  studyingLesson,
  handleSendResults,
  studyingWords, 
  mistakesList, 
  testDate,
  setIsUpdated 
}) {
  const [curentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  let letters;
  const testName = 'Writing'

  const clearInput = (e) => {
    setTimeout(() => {
      setCurrentWordIndex(curentWordIndex + 1)
      e.target.value = ''
      e.target.classList.remove('test__answer-input_correct')
    }, 500)
  }

  const handleWrongAnswer = (e) => {
    e.target.classList.add('test__answer-input_wrong')
  }

  const handleCorrectAnswer = (e) => {
    e.target.classList.remove('test__answer-input_wrong')
    e.target.classList.add('test__answer-input_correct')

  }

  const handleCheckAnswer = (e) => {
    if (e.target.value.toLowerCase() === studyingWords[curentWordIndex].eng.toLowerCase()) {
      if (curentWordIndex !== studyingWords.length - 1) {
        handleCorrectAnswer(e)
        clearInput(e)
      } else {
        handleCorrectAnswer(e)
        setTimeout(() => {
          handleFinishExam()
        }, 500)
      }
    } else {
      handleWrongAnswer(e)
    }
  }

  const handleChange = (e) => {
    handleCheckAnswer(e)
  }

  const handleSkipWord = () => {
    if (curentWordIndex !== studyingWords.length - 1) {
      mistakesList.push(studyingWords[curentWordIndex].cn)
      setCurrentWordIndex(curentWordIndex + 1)
    } else {
      mistakesList.push(studyingWords[curentWordIndex].cn)
      handleFinishExam()
    }
  }
 
  const handleHelp = () => {
    letters = studyingWords[curentWordIndex].eng.split('')
    for (let i = letters.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
     letters = letters.join('-')
  }
  handleHelp()

  const handleFinishExam = () => {
    handleSendResults(testName, testDate, currentUser, currentUserDepartment, studyingDepartment, studyingLesson, mistakesList)
    setIsUpdated(true)
    setIsFinished(true)
  }

  const testTemplate = (
    <>
      <p className="test__main-word">{studyingWords[curentWordIndex].cn}</p>
      <p className="test__help">{letters}</p>
      <input onChange={handleChange} className="test__answer-input" />
      <p className="test__skip" onClick={handleSkipWord}>Skip</p>
    </>
  )

  const finishMessageTemplate = (
    <>
      <p className="test__final-message">Thank you</p>
      <Link to={MAINPAGE} className="test__final-link">Back to Main page</Link>
    </>
  )
  
  return (
    <div className="test__container">
      {isFinished ? finishMessageTemplate : testTemplate}
  </div>
  )
}

export default TestWithInput;