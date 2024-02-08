import { useState } from "react";

function TestWithFourWords ({ 
  currentUser,
  currentUserDepartment,
  studyingDepartment,
  studyingLesson,
  handleSendResults,
  studyingWords, 
  mistakesList, 
  onFinish,
  testDate,
  setIsUpdated
 }) {

  const answersList = [];
  const [curentWordIndex, setCurrentWordIndex] = useState(0);
  const testName = '4words'

  const createAnswers = (answers) => {
    answers.push(studyingWords[curentWordIndex].eng)
    if (studyingWords.length < 4) {
      while (answers.length !== studyingWords.length) {
        const randomId = Math.floor(Math.random() * studyingWords.length)
        if (!answers.includes(studyingWords[randomId].eng)) {
          answers.push(studyingWords[randomId].eng)
        }
      }
    } else {
      while (answers.length < 4) {
        const randomId = Math.floor(Math.random() * studyingWords.length)
        if (!answers.includes(studyingWords[randomId].eng)) {
          answers.push(studyingWords[randomId].eng)
        }
      }
    }
    return answers;
  }

  const mixAnswers = (answers) => {
    for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
  }

  const getAnswers = () => {
    createAnswers(answersList);
    mixAnswers(answersList)
  }

  const handleCorrectAnswer = (e) => {
    e.target.classList.add('test__answer-button_correct')
    setTimeout(() => {
      e.target.classList.remove('test__answer-button_correct')
      setCurrentWordIndex(curentWordIndex + 1)
    }, 500);
  }

  const handleWrongAnswer = (e) => {
    e.target.classList.add('test__answer-button_wrong')
    if (!mistakesList.includes(studyingWords[curentWordIndex].cn)) {
      mistakesList.push(studyingWords[curentWordIndex].cn)
    }
    setTimeout(() => {
      e.target.classList.remove('test__answer-button_wrong')
    }, 500);

  }

  const handleFinishExam = (e) => {
    e.target.classList.add('test__answer-button_correct')
    console.log('eto v teste',testName, testDate, currentUser, currentUserDepartment, studyingDepartment, studyingLesson, mistakesList)
    handleSendResults(testName, testDate, currentUser, currentUserDepartment, studyingDepartment, studyingLesson, mistakesList)
    setIsUpdated(true)
    setTimeout(() => {
      e.target.classList.remove('test__answer-button_correct')
      onFinish(true)
    }, 500);
  }

  const handleCheckAnswer = (e) => {
    if (e.target.textContent === studyingWords[curentWordIndex].eng) {
      if (curentWordIndex !== studyingWords.length - 1) {
        handleCorrectAnswer(e)
      } else {
        handleFinishExam(e)
      }
    } else {
      handleWrongAnswer(e)
    }
  }

  getAnswers();
  return (
    <div className="test__container">
      <p className="test__main-word">{studyingWords[curentWordIndex].cn}</p>
      <div className="test__answer-button_container">
        {answersList.map((answer) => {
          return (
            <button onClick={handleCheckAnswer} className="test__answer-button">{answer}</button>
          )
        })}
      </div>
    </div>
  )
}

export default TestWithFourWords;