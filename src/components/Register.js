import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailRegister = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePasswordRegister = (evt) => {
    setPassword(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(email, password);
  };

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="popup__inputs" onSubmit={handleSubmit}>
        <input
          onChange={handleEmailRegister}
          value={email}
          type="text"
          className="login__input"
          name="email"
          placeholder="Email"
          required=""
        />
        <input
          onChange={handlePasswordRegister}
          value={password}
          type="password"
          className="login__input"
          name="password"
          placeholder="Пароль"
          required=""
        />
        <button className="login__button">Зарегистрироваться</button>
        <p className="register__link">
          Уже зарегистрированы?
          <Link className="register__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
