import {parseJwt} from "./jwt";
import dayjs from "dayjs";

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
    constructor(token: string, picture: string, isAdmin: boolean) {
        this.token = token;
        this.picture = picture;
        this.isAdmin = isAdmin;
    }

    static loadFromCache() {
        const token = localStorage.getItem('userToken');
        return User._fromToken(token);
    }

    static setupFromToken(token: string) {
        localStorage.setItem('userToken', token)
        return User._fromToken(token);
    }

    static _fromToken(token: string | null) {
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
}
