import environment from './environment';
import axios from 'axios';

class DBLayer {
    static signIn(credentials) {
        const apiURL = `${environment.API_URL}/sign-in`;
        return axios.post(apiURL, credentials);
    }

    static signUp(userDetails) {
        const apiURL = `${environment.API_URL}/sign-up`;
        return axios.post(apiURL, userDetails);
    }

    static signOut() {
        const apiURL = `${environment.API_URL}/sign-out`;
        return axios.post(apiURL);
    }
}

export default DBLayer;
