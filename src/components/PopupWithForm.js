import React from "react";
const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  infoBtn,
}) => {
  return (
    <>
      <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button className="popup__closed" type="button" onClick={onClose} />
          <h2 className="popup__title">{title}</h2>
          <form
            className="popup__form popup__form_type_profile"
            name={name}
            noValidate=""
            onSubmit={onSubmit}
          >
            {children}
            <button className="popup__add" type="submit">
              {infoBtn}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PopupWithForm;
