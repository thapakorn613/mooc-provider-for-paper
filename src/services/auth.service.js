import axios from 'axios';
const env = require('../models/enviroment')
var TEMP_API_URL = ""
if (env.NODE_ENV == "develop"){ TEMP_API_URL =  env.DEVELOPER.URL_PATH + env.DEVELOPER.DB_PORT + '/auth/'}
else {TEMP_API_URL =  env.PRODUCTION.URL_PATH + '/auth/'}
const API_URL =  TEMP_API_URL
class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();