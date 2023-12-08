import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onDeleteClick,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Аватар"
        />
        <button className="profile__avatar-button" onClick={onEditAvatar} />
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__author">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="content">
        <div className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onDeleteClick={onDeleteClick}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              link={card.link}
              name={card.name}
              likes={[...card.likes]}
            />
          ))}
        </div>
      </section>
      <template id="template" />
    </main>
  );
};

export default Main;
