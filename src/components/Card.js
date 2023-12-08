import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

const Card = ({
  card,
  id,
  onCardClick,
  name,
  link,
  likes,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button ${
    isLiked && "element__button-active"
  }`;
  function handleClick() {
    onCardClick({ name, link });
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleCardDelete() {
    onCardDelete(card);
  }
  return (
    <div className="element">
      <img
        className="element__photo"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      {isOwn && (
        <button className="element__closed" onClick={handleCardDelete} />
      )}
      <div className="element__info">
        <h2 className="element__title">{name}</h2>
        <div className="element__like_container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <span className="element__like_sum">{likes.length}</span>
        </div>
      </div>
    </div>
  );
};
export default Card;
