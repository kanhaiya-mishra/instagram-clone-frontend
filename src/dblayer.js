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

    static allUserPosts(username) {
        const apiURL = `${environment.API_URL}/insta-post/user/${username}`;
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

    static getParticularPost(id) {
        const apiURL = `${environment.API_URL}/insta-post/${id}`;
        return axios.get(apiURL, globalOptions);
    }

    static getComment(id) {
        const apiURL = `${environment.API_URL}/comment/${id}`;
        return axios.get(apiURL, globalOptions);
    }
}

export default DBLayer;
