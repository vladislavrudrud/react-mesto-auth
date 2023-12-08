import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import logo from "../images/Vector.svg";

const Header = (props) => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        ></Route>
        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__info">{props.email}</p>
              <Link
                className="header__exit"
                to="sign-in"
                onClick={props.onLogout}
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
};
export default Header;
