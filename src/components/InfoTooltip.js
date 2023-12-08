const InfoTooltip = ({ isOpen, onClose, title, image }) => {
  return (
    <div className={`popup popup__infotooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__closed" type="button" onClick={onClose} />
        <img className="popup__infotooltip-image" src={image} alt="Ошибка" />
        <h2 className="popup__infotooltip-title">{title}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
