// checked
import { LANG_CN, LANG_ENG } from "../utils/constants";
import { register } from "../utils/languages";
import { Link } from "react-router-dom";

function Register ({ onSubmit, onChange, handleLanguage, isLanguageEnglish }) {
const ENG = register.eng;
const CN = register.cn;

const handleSubmit = (evt) => {
  evt.preventDefault();
  onSubmit();
};

  return (
    <div className="auth">
      <div className="auth__container">
      <div className="language">
        <p className={isLanguageEnglish ? 'language__active' : ''} onClick={handleLanguage}>{LANG_ENG}</p>
        <p className={!isLanguageEnglish ? 'language__active' : ''} onClick={handleLanguage}>{LANG_CN}</p>
      </div>
        <p className="auth__title">{isLanguageEnglish ? ENG.title : CN.title}</p>
        <form action="" method="post" className="auth__form" onSubmit={handleSubmit}>
          <p className="auth__form__input-block">
            <label for="name">{isLanguageEnglish ? ENG.login_input : CN.login_input}</label>
            <input className="auth__form_input" onChange={onChange} type="text" name="name" id="login" placeholder={isLanguageEnglish ? ENG.login_placeholder : CN.login_placeholder} required minLength={2} maxLength={10}/>
            <p id="login-error" className="error">Login should be from 2 symbols</p>
          </p>
          <p className="auth__form__input-block">
            <label for="name">{isLanguageEnglish ? ENG.department_input : CN.department_input}</label>
            <input className="auth__form_input" onChange={onChange} type="text" name="department" id="department" placeholder={isLanguageEnglish ? ENG.department_placeholder : CN.department_placeholder} required minLength={2} maxLength={10}/>
            <p id="login-error" className="error">Department should be from 2 symbols</p>
          </p>
          <p className="auth__form__input-block">
            <label for="name">{isLanguageEnglish ? ENG.password_input : CN.password_input}</label>
            <input className="auth__form_input" onChange={onChange} type="password" name="password" id="password" placeholder={isLanguageEnglish ? ENG.password_placeholder : CN.password_placeholder} required minLength={3}/>
          </p>
          <p className="auth__form__input-block">
            <label for="name">{isLanguageEnglish ? ENG.confirmation_input : CN.confirmation_input}</label>
            <input className="auth__form_input" onChange={onChange} type="password" name="confirmation" id="password" placeholder={isLanguageEnglish ? ENG.confirmation_placeholder : CN.confirmation_placeholder} required minLength={3}/>
          </p>
          <button type="submit" className="button">{isLanguageEnglish ? ENG.button : CN.button}</button>
        </form>
        <p>{isLanguageEnglish ? ENG.invitation_message : CN.invitation_message}<Link to='/signin' className="link">{isLanguageEnglish ? ENG.invitation_link : CN.invitation_link}</Link></p>
      </div>
    </div>
  );
};

export default Register;