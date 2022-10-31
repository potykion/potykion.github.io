import {parseJwt} from "./jwt.js";

export class User {
    /** @type {string} */
    token;
    /** @type {string} */
    picture;
    /** @type {boolean} */
    isAdmin;


    /**
     *
     * @param {string} token
     * @param {string} picture
     * @param {boolean} isAdmin
     */
    constructor(token, picture, isAdmin) {
        this.token = token;
        this.picture = picture;
        this.isAdmin = isAdmin;
    }

    static loadFromCache() {
        const token = localStorage.getItem('userToken');
        return User._fromToken(token);
    }

    static setupFromToken(token) {
        localStorage.setItem('userToken', token)
        return User._fromToken(token);
    }

    static _fromToken(token) {
        if (!token) return null;

        const tokenData = parseJwt(token);

        let exp = dayjs() > dayjs(tokenData.exp * 1000);
        if (exp) return null;

        return new User(
            token,
            tokenData.picture,
            tokenData.email === 'potykion@gmail.com',
        );
    }

    static setupAuth(authBtn, callback) {
        google.accounts.id.initialize({
            client_id: "643332836412-9o4lbidm9e1th1um834fhd9jd8hvbhun.apps.googleusercontent.com",
            callback: (resp) => callback(resp.credential),
        });
        google.accounts.id.renderButton(
            document.querySelector(authBtn),
            {theme: "outline", size: "medium", type: 'icon', shape: 'circle'}
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
        return null;
    }
}