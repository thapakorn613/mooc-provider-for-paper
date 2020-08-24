import axios from 'axios';
import authHeader from './auth-header';
const env = require('../models/enviroment')

var TEMP_API_URL = ""
if (env.NODE_ENV == "develop"){ TEMP_API_URL =  env.DEVELOPER.URL_PATH + env.DEVELOPER.DB_PORT + '/test/'}
else {TEMP_API_URL =  env.PRODUCTION.URL_PATH+ '/test/'}
const API_URL =  TEMP_API_URL

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }
    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();