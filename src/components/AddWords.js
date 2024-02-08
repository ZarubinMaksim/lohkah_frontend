// checked

import { useRef, useState } from "react";
import { addWord } from "../utils/languages";

function AddWords ({ onSubmit, handleLanguage, isLanguageEnglish, onChange, wordsData }) {
  const cnRef = useRef();
  const engRef = useRef();
  const exRef = useRef();
  const ENG = addWord.eng;
  const CN = addWord.cn;
  const wordsKeys = Object.keys(wordsData);
  const [isAdded, setIsAdded] = useState(false);

  const clearInputs = () => {
    cnRef.current.value = '';
    engRef.current.value = '';
    exRef.current.value = '';
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
    clearInputs();
    setIsAdded(true);
  };

  const handleValidity = (e) => {
    const currentElementError = document.querySelector(`#${e.target.id}-error`)
    if (!e.target.validity.valid) {
      currentElementError.classList.add('error__active')
    } 
    if (e.target.validity.valid) {
      currentElementError.classList.remove('error__active')
    }
  };

  return (
    <div className="add-word">
      <div className="add-word__container">
        <div className="language">
          <p className={isLanguageEnglish ? 'language__active' : ''} onClick={handleLanguage}>EN</p>
          <p className={!isLanguageEnglish ? 'language__active' : ''} onClick={handleLanguage}>中</p>
        </div>
        <p className="add-word__title">{isLanguageEnglish ? ENG.title : CN.title}</p>
        <form action="" method="post" className="add-word__form" onSubmit={handleSubmit} novalidate>
          <p className="add-word__form__input-block">
            <label for="department">{isLanguageEnglish ? ENG.department_input : CN.department_input}</label>
            <input type="text" onChange={onChange} onInput={handleValidity} name="department" id="department" placeholder={isLanguageEnglish ? ENG.department_placeholder : CN.department_placeholder} required minLength={2} maxLength={15}/>
            <p id="department-error" className="error">Department should be from 2 to 15 symbols</p>
          </p>
          <p className="add-word__form__input-block">
            <label for="lesson">{isLanguageEnglish ? ENG.lesson_input : CN.lesson_input}</label>
            <input type="text" onChange={onChange} onInput={handleValidity} name="lessonName" id="lesson" placeholder={isLanguageEnglish ? ENG.lesson_placeholder : CN.lesson_placeholder} required minLength={3} maxLength={15}/>
            <p id="lesson-error" className="error">Lesson should be from 3 to 15 symbols</p>
          </p>
          <p className="add-word__form__input-block">
            <label for="cn">{isLanguageEnglish ? ENG.cn_input : CN.cn_input}</label>
            <input ref={cnRef} type="text" onChange={onChange} onInput={handleValidity} name="cn" id="cn" placeholder={isLanguageEnglish ? ENG.cn_placeholder : CN.cn_placeholder} required minLength={1} maxLength={10}/>
            <p id="cn-error" className="error">Word should be from 2 to 10 symbols</p>
          </p>
          <p className="add-word__form__input-block">
            <label for="eng">{isLanguageEnglish ? ENG.eng_input : CN.eng_input}</label>
            <input ref={engRef} type="text" onChange={onChange} onInput={handleValidity} name="eng" id="eng" placeholder={isLanguageEnglish ? ENG.eng_placeholder : CN.eng_placeholder} required minLength={2} maxLength={18}/>
            <p id="eng-error" className="error">Word should be from 2 to 18 symbols</p>
          </p>
          <p className="add-word__form__input-block">
            <label for="example">{isLanguageEnglish ? ENG.example_input : CN.example_input}</label>
            <input  ref={exRef} type="text" onChange={onChange} onInput={handleValidity} name="example" id="example" placeholder={isLanguageEnglish ? ENG.example_placeholder : CN.example_placeholder} minLength={5} maxLength={30}/>
            <p id="example-error" className="error">Example should be from 5 to 30 symbols</p>
          </p>
          <button type="submit" className="button">{isLanguageEnglish ? ENG.button : CN.button}</button>
        </form>
      </div>
      {isAdded ? (
        <div className="add-word__list">
          {
            wordsKeys.map((key, index) => {
              return (
                <p>{index+1}. {key} - {wordsData[key]}</p>
              )
            })
          }
        </div>
      ) : (null)}
    </div>
  )
}

export default AddWords;