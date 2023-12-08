import React from "react";
const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>
      <div className="popup__container-image">
        <button className="popup__closed" type="button" onClick={onClose} />
        <div className="popup__figure">
          <img
            className="popup__photo"
            src={card ? card.link : ""}
            alt={card ? card.name : ""}
          />
          <h2 className="popup__caption">{card ? card.name : ""}</h2>
        </div>
      </div>
    </div>
  );
};
export default ImagePopup;
