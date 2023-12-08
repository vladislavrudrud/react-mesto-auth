import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function updateName(evt) {
    setName(evt.target.value);
  }

  function updateLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="addPopupForm"
      infoBtn="Добавить"
      children={
        <div className="popup__inputs">
          <input
            onChange={updateName}
            value={name}
            type="text"
            className="popup__input popup__input-add"
            minLength={2}
            maxLength={30}
            id="title"
            name="name"
            placeholder="Название"
            required=""
          />
          <span
            className="popup__input-error popup__span-error"
            id="title-error"
          />
          <input
            onChange={updateLink}
            value={link}
            type="url"
            className="popup__input"
            id="card"
            name="link"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span
            className="popup__input-error popup__span-error"
            id="card-error"
          />
        </div>
      }
    />
  );
}

export default AddPlacePopup;
