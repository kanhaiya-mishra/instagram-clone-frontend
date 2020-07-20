import Cookies from 'js-cookie';

export default class UserService {

    static setUser(userDetails, rememberMe) {
        try {
            Cookies.set('userDetails', userDetails);
        } catch (err) {
            console.log(err);
        }
    }

    static getUser() {
        const userDetailString = Cookies.get('userDetails');
        const userDetails = userDetailString ? JSON.parse(userDetailString) : null;
        return userDetails;
    }

    static removeUser() {
        Cookies.remove('userDetails');
    }

    static updateUser(userDetails, expires) {
        try {
            Cookies.set('userDetails', userDetails);
        } catch (err) {
            console.log(err);
        }
    }
}
