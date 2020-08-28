import axios from 'axios';
import qs from 'qs';
const env = require('../models/enviroment')

var TEMP_API_URL = ""
if (env.NODE_ENV == "develop"){ TEMP_API_URL =  env.DEVELOPER.URL_PATH + env.DEVELOPER.DB_PORT}
else {TEMP_API_URL =  env.PRODUCTION.URL_PATH}
const API_URL =  TEMP_API_URL

class CourseCompletionAPI {
    async getCourseCompletion(courseBeokerId,tcu_username) {
        var paramData = "?"+ "tcu_username=" + tcu_username + '&' + "courseid="+ courseBeokerId  ;
        console.log("url : ", API_URL + '/coursecompletion' + paramData)
        var config = {
            method: 'get',
            url: API_URL + '/coursecompletion' + paramData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM0'
            }
        };
        return await axios(config).then(function (response) {
            return JSON.parse(JSON.stringify(response.data))
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export default new CourseCompletionAPI();