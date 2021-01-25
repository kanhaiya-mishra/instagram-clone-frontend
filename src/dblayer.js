import environment from './environment';
import axios from 'axios';

const API = axios.create({ withCredentials: true });
class DBLayer {
   static signIn(credentials) {
      const apiURL = `${environment.API_URL}/sign-in`;
      return API.post(apiURL, credentials);
   }

   static signUp(userDetails) {
      const apiURL = `${environment.API_URL}/sign-up`;
      return API.post(apiURL, userDetails);
   }

   static signOut() {
      const apiURL = `${environment.API_URL}/sign-out`;
      return API.post(apiURL);
   }

   static allUserPosts(username) {
      const apiURL = `${environment.API_URL}/insta-post/user/${username}`;
      return API.get(apiURL);
   }

   static uploadImage(data) {
      const apiURL = environment.CLOUDINARY_URL;
      return axios.post(apiURL, data);
   }

   static postInstaPost(data) {
      const apiURL = `${environment.API_URL}/insta-post`;
      return API.post(apiURL, data);
   }

   static getParticularPost(id) {
      const apiURL = `${environment.API_URL}/insta-post/${id}`;
      return API.get(apiURL);
   }

   static getComments(id) {
      const apiURL = `${environment.API_URL}/comment/${id}`;
      return API.get(apiURL);
   }

   static addComment(commentData) {
      const apiURL = `${environment.API_URL}/comment`;
      return API.post(apiURL, commentData);
   }

   static deleteComment(id) {
      const apiURL = `${environment.API_URL}/comment/${id}`;
      return API.delete(apiURL);
   }

   static followUser(id) {
      const apiURL = `${environment.API_URL}/follower/${id}`;
      return API.put(apiURL);
   }

   static unfollowUser(id) {
      const apiURL = `${environment.API_URL}/follower/${id}`;
      return API.delete(apiURL);
   }

   static getAllUsersByUsername(id) {
      const apiURL = `${environment.API_URL}/get-all-users-by-username/${id}`;
      return API.get(apiURL);
   }
}

export default DBLayer;
