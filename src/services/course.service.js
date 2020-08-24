import axios from 'axios';
import qs from 'qs';
const env = require('../models/enviroment')

var TEMP_API_URL = ""
if (env.NODE_ENV == "develop"){ TEMP_API_URL =  env.DEVELOPER.URL_PATH + env.DEVELOPER.DB_PORT + '/course/'}
else {TEMP_API_URL =  env.PRODUCTION.URL_PATH + '/course/'}
const API_URL =  TEMP_API_URL

class CourseService {
    getCourseDetail(ownercourse) {
        var config = {
            method: 'get',
            url: API_URL + 'getCourseDetail',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: ownercourse
        };
        return axios(config).then(function (response) {
            return JSON.stringify(response.data)
        }).catch(function (error) {
            console.log(error);
        });
    }
    addCourse(courseData) {
        var config = {
            method: 'post',
            url: API_URL +'add',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: courseData
        };
        return axios(config)
            .then(function (response) {
                return JSON.stringify(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    updateCourse(courseData) {
        var config = {
            method: 'post',
            url: API_URL + 'update',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: courseData
        };
        return axios(config)
            .then(function (response) {
                return JSON.stringify(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async getOwnerCourse(currentUser) {
        var data_getAllCourse = qs.stringify({
            'ownercourse': currentUser.username 
        });
        var config = {
            method: 'post',
            url: API_URL + 'getOwnerCourse',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data_getAllCourse
        };
        return await axios(config).then(function (response) {
            return JSON.parse(JSON.stringify(response.data))
        }).catch(function (error) {
            console.log(error);
        });
    }

    async getAllCourse(currentUser) {
        var data_getAllCourse = qs.stringify();
        var config = {
            method: 'get',
            url: API_URL + 'getAllCourse',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data_getAllCourse
        };
        return await axios(config).then(function (response) {
            return JSON.parse(JSON.stringify(response.data))
        }).catch(function (error) {
            console.log(error);
        });
    }

    async deleteCourseById(courseid) {
        var data_getAllCourse = qs.stringify({
            'id': courseid,
        });
        var config = {
            method: 'post',
            url: API_URL + 'delete',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data_getAllCourse
        };
        return await axios(config).then(function (response) {
            return JSON.parse(JSON.stringify(response.data))
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export default new CourseService();