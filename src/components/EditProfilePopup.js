import PopupWithForm from "./PopupWithForm";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function updateName(evt) {
    setName(evt.target.value);
  }

  function updateDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="editProfile"
      infoBtn="Сохранить"
    >
      <div className="popup__inputs">
        <input
          onChange={updateName}
          value={name || ""}
          type="text"
          className="popup__input popup__input-author"
          minLength={2}
          maxLength={40}
          id="name"
          name="name"
          placeholder="Имя"
          required=""
        />
        <span
          className="popup__input-error popup__span-error"
          id="name-error"
        />
        <input
          onChange={updateDescription}
          value={description || ""}
          type="text"
          className="popup__input"
          id="description"
          minLength={2}
          maxLength={200}
          name="info"
          placeholder="О себе"
          required=""
        />
        <span
          className="popup__input-error popup__span-error"
          id="description-error"
        />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
