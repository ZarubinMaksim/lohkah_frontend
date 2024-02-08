// checked
import { LANG_CN, LANG_ENG } from "../utils/constants";
import { login } from "../utils/languages";
import { Link } from "react-router-dom";

function Login ({ onSubmit, onChange, handleLanguage, isLanguageEnglish }) {
  const ENG = login.eng;
  const CN = login.cn;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  }

  return (
    <div className="auth">
      <div className="auth__container">
      <div className="language">
        <p className={isLanguageEnglish ? 'language__active' : ''} onClick={handleLanguage}>{LANG_ENG}</p>
        <p className={!isLanguageEnglish ? 'language__active' : ''} onClick={handleLanguage}>{LANG_CN}</p>
      </div>
        <p className="auth__title">{isLanguageEnglish ? ENG.title : CN.title}</p>
        <form action="" method="post" className="auth__form">
          <p className="auth__form__input-block">
            <label for="name">{isLanguageEnglish ? ENG.login_input : CN.login_input}</label>
            <input className="auth__form_input" onChange={onChange} type="text" name="name" id="login" placeholder={isLanguageEnglish ? ENG.login_placeholder : CN.login_placeholder} required/>
          </p>
          <p className="auth__form__input-block">
            <label for="password">{isLanguageEnglish ? ENG.password_input : CN.password_input}</label>
            <input className="auth__form_input" onChange={onChange} type="password" name="password" id="password" placeholder={isLanguageEnglish ? ENG.password_placeholder : CN.password_placeholder} required />
          </p>
          <button type="submit" className="button" onClick={handleSubmit}>{isLanguageEnglish ? ENG.button : CN.button}</button>
        </form>
        <p>{isLanguageEnglish ? ENG.invitation_message : CN.invitation_message}<Link to='/signup' className="link">{isLanguageEnglish ? ENG.invitation_link : CN.invitation_link}</Link></p>
      </div>
    </div>
  );
};

export default Login;