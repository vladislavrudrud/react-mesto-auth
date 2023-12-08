import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = React.useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }
  useEffect(() => {
    if (!isOpen) {
      ref.current.value = "";
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="editAvatar"
      infoBtn="Сохранить"
      children={
        <div className="popup__inputs">
          <input
            type="url"
            className="popup__input popup__input-add"
            id="avatar"
            name="editAvatar"
            placeholder="Ссылка"
            ref={ref}
          />
          <span
            className="popup__input-error popup__span-error"
            id="avatar-error"
          />
        </div>
      }
    />
  );
}

export default EditAvatarPopup;
