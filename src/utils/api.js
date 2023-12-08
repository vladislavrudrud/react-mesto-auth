class Api {
    constructor(options) {
      this._link = options.link
      this._headers = options.headers
    }
  
    _getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  
    getInitialCards() {
      return fetch(`${this._link}/cards`, {
        method: 'GET',
        headers: this._headers
      })
        .then(res => this._getResponseData(res));
    }
    addCard(data) {
      return fetch(`${this._link}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
        .then(res => this._getResponseData(res));
    }
    removeCard(cardId) {
      return fetch(`${this._link}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._getResponseData(res));
    }
    // likeCard(cardId) {
    //   return fetch(`${this._link}/cards/${cardId}/likes`, {
    //     method: 'PUT',
    //     headers: this._headers
    //   })
    //     .then(res => this._getResponseData(res));
    // }

    changeLikeCardStatus(cardId, like) {
      return fetch (`${this._link}/cards/${cardId}/likes`, {
        method: like ? "PUT" : "DELETE",
        headers: this._headers,
        body: JSON.stringify({
          _id: `${cardId}`
        }),
      })
      .then(res => this._getResponseData(res));
    }

    removeLikeCard(cardId) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._getResponseData(res));
    }
    getUserInfo() {
      return fetch(`${this._link}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
        .then(res => this._getResponseData(res));
    }
    setUserInfo(data) {
      return fetch(`${this._link}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(res => this._getResponseData(res));
    }
    editUserPhoto(data) {
      return fetch(`${this._link}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(res => this._getResponseData(res));
    }
  }

  const api = new Api({
    link: "https://mesto.nomoreparties.co/v1/cohort-77",
    headers: {
      authorization: "9600f663-0585-482a-86e1-d76605b15ff1",
      "Content-Type": "application/json",
    },
  });
  export default api