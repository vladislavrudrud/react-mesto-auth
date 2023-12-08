import React from "react";
const Login = ({ onLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="popup__inputs" onSubmit={handleSubmit}>
        <input
          onChange={handleEmail}
          value={email}
          type="text"
          className="login__input"
          name="email"
          placeholder="Email"
          required=""
        />
        <input
          onChange={handlePassword}
          value={password}
          type="password"
          className="login__input"
          name="text"
          placeholder="Пароль"
          required=""
        />
        <button className="login__button">Войти</button>
      </form>
    </div>
  );
};

export default Login;
