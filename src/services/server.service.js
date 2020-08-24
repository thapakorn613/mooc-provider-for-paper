import axios from 'axios';
import qs from 'qs';
const env = require('../models/enviroment')

var API_URL = ""
if (env.NODE_ENV == "develop"){ API_URL =  env.DEVELOPER.URL_PATH + env.DEVELOPER.DB_PORT + '/server/';}
else {API_URL =  env.PRODUCTION.URL_PATH + '/server/';}

class ServerService {
    async getOwnerServer(currentUser) {
        var data_getOwnerCourse = qs.stringify({
            'ownerpass': currentUser.username
        });
        var config = {
            method: 'post',
            url: API_URL + 'getOwnerServer',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data_getOwnerCourse
        };
        return await axios(config).then(function (response) {
            return JSON.parse(JSON.stringify(response.data))
        }).catch(function (error) {
            console.log(error);
        });
    }

    async addServer(serverData) {
        var config = {
            method: 'post',
            url: API_URL + 'add',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: serverData
        };
        return await axios(config).then(function (response) {
            return JSON.parse(JSON.stringify(response.data))
        }).catch(function (error) {
            console.log(error);
        });
    }

    async deleteServer(serverData) {
        var config = {
            method: 'post',
            url: API_URL + 'delete',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: serverData
        };
        return await axios(config).then(function (response) {
            return JSON.parse(JSON.stringify(response.data))
        }).catch(function (error) {
            console.log(error);
        });
    }

    updateServer(dataForUpdate) {
        var config = {
            method: 'post',
            url: API_URL + 'update',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: dataForUpdate
        };
        return axios(config).then(function (response) {
            return JSON.parse(JSON.stringify(response.data))
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export default new ServerService();