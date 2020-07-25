import environment from './environment';
import axios from 'axios';
const globalOptions = {
    withCredentials: true
}
class DBLayer {
    static signIn(credentials) {
        const apiURL = `${environment.API_URL}/sign-in`;
        return axios.post(apiURL, credentials, { withCredentials: true });
    }

    static signUp(userDetails) {
        const apiURL = `${environment.API_URL}/sign-up`;
        return axios.post(apiURL, userDetails);
    }

    static signOut() {
        const apiURL = `${environment.API_URL}/sign-out`;
        return axios.post(apiURL);
    }

    static getProfile(username) {
        const apiURL = `${environment.API_URL}/user-profile/${username}`;
        return axios.get(apiURL, globalOptions);
    }

    static uploadImage(data) {
        const apiURL = environment.CLOUDINARY_URL;
        return axios.post(apiURL, data);
    }

    static postInstaPost(data) {
        const apiURL = `${environment.API_URL}/insta-post`;
        return axios.post(apiURL, data, globalOptions);
    }
}

export default DBLayer;
