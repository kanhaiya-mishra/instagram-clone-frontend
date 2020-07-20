import environment from './environment';
import axios from 'axios';

class DBLayer {
    static signIn(credentials) {
        const apiURL = `${environment.API_URL}/signin`;
        return axios.post(apiURL, credentials)
    }

    static signUp(userDetails) {
        const apiURL = `${environment.API_URL}/signup`;
        return axios.post(apiURL, userDetails);
    }
}

export default DBLayer;
