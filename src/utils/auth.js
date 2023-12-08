class Auth {
    constructor(url) {
        this.url = url;
    }

    _getResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      }

      register(email, password) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password})
        })
        .then((res) => {
            return this._getResponse(res)
        })
      }
      authorize(email, password) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(this._getResponse)
      }
      getToken(token) {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            return this._getResponse(res)
        })
      }
}

const auth = new Auth('https://auth.nomoreparties.co')
export default auth