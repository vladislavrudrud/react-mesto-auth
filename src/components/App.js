import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../index.css";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import auth from "../utils/auth";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import open from "../images/open.svg";
import close from "../images/close.svg";

function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopup, setIsDeletePlacePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({
    text: "",
    image: null,
  });

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo().then(setCurrentUser).catch(console.log);
      api.getInitialCards().then(setCards).catch(console.log);
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleDeletePlaceClick = () => {
    setIsDeletePlacePopup(!isDeletePlacePopup);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopup(false);
    setSelectedCard(null);
    setIsTooltipOpen(false);
  };

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editUserPhoto(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRegistration = async (email, password) => {
    try {
      await auth.register(email, password);
      setTooltipContent({ text: "Вы успешно зарегистрировались!", image: open });
      setIsTooltipOpen(true);
      await Promise.resolve();
      navigate("/sign-in", { replace: true });
    } catch (err) {
      console.log(err);
      setTooltipContent({
        text: "Что-то пошло не так! Попробуйте ещё раз.",
        image: close,
      });
      setIsTooltipOpen(true);
    }
  };

  const handleAuthorization = async (email, password) => {
    try {
      const res = await auth.authorize(email, password);
      if (res.token) {
        localStorage.setItem("token", res.token);
        setUserEmail(email);
        setLoggedIn(true);
        navigate("/", { replace: true });
        return res;
      }
    } catch (err) {
      console.log(err);
      setTooltipContent({
        text: "",
        image: open,
      });
      setIsTooltipOpen(true);
    }
  };

  const handleToken = (jwt) => {
    auth
      .getToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      handleToken(jwt);
    }
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} onLogout={handleLogout} />
        <Routes>
          <Route
            path="*"
            element={
              <Navigate to={loggedIn ? "/" : "/sign-in"} replace={true} />
            }
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                element={
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onDeleteClick={handleDeletePlaceClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                }
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            exact
            path="/sign-up"
            element={<Register onRegister={handleRegistration} />}
          />
          <Route
            exact
            path="/sign-in"
            element={<Login onLogin={handleAuthorization} />}
          />
        </Routes>
      </div>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm
        isOpen={isDeletePlacePopup}
        onClose={closeAllPopups}
        title="Вы уверены?"
        name="deleteCard"
        infoBtn="Да"
      ></PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        title={tooltipContent.text}
        image={tooltipContent.image}
      />
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        title={tooltipContent.text}
        image={tooltipContent.image}
      />
      {loggedIn && <Footer />}
    </CurrentUserContext.Provider>
  );
}

export default App;
