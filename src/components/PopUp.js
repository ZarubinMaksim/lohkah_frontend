import React, { useEffect, useRef, useState } from 'react';
import closeButton from '../images/delete.png'

function PopUp({ 
  setPopupRequest,
  setIsTestResultsRequested,
  popupRequest,
  isTestsResultsRequested,
  testResults,
  createExelFile,
  isPopupOpened,
  setIsPopupopened,
  transferingData,
  popupName
}) {
  const popupRef = useRef();
  const chosenElements = []

  useEffect(() => {
    if (isPopupOpened) {
      openPopup()
    }
  }, [isPopupOpened])

  const openPopup = () => {
    setPopupRequest(!popupRequest)
    popupRef.current.classList.add('popup__active')
  }

  const closePopup = () => {
    setIsPopupopened(false)
    popupRef.current.classList.remove('popup__active')
  }

  const handleClick = (id) => {
    const listElement = document.querySelector('#users-list')
    const element = listElement.querySelector(`#user-${id}`)
    
    if (element.classList.value.includes('popup__element_chosen')) {
      element.classList.remove('popup__element_chosen')
      chosenElements.splice(chosenElements.indexOf(element.textContent), 1)
      console.log(chosenElements)
    } else { 
      element.classList.add('popup__element_chosen')
      chosenElements.push(element.textContent)
      console.log(chosenElements)
    }
  }

  const handleDownloadExcel = () => {
    setIsTestResultsRequested(!isTestsResultsRequested)
    const testResultsByUsersOrDepartments = testResults.data.filter(function (result) {
      return chosenElements.includes(popupName === 'name' ? result.name : result.department)
    })
    createExelFile(testResultsByUsersOrDepartments)
  }
  
  return (
  <div className='popup__container'>
        <div className='popup' ref={popupRef}>
          <img src={closeButton} alt='Close' onClick={closePopup} className='popup__button-close'/>
          <div className='popup__list-element' id='users-list'>
          {transferingData.map((data, key) => {
            return(
              <div className='popup__element' id={`user-${key}`} onClick={() => handleClick(key)}>
              <label>{popupName === 'name' ? data.name : data}</label>
              </div>
            )
          })}
          </div>
          <button className='popup__button-submit' onClick={handleDownloadExcel}>Download</button>
        </div>
      </div>
  )
}

export default PopUp;