import CONNECTAPI from "../api/connectApi";
import axios from 'axios'
import { Notification } from 'element-ui'
import qs from 'qs';

let fetch = axios.create({
    // baseURL: '/',
    baseURL: 'http://localhost:8083/',
    timeout: 3000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})

let loadingNotice = null
const http = {}

for (let i in CONNECTAPI) {
    let api = CONNECTAPI[i];
    http[i] = async function (
        params,//请求参数put,post,patch (data);get,delete (url)
        isFormData,//是否使用formdata请求
        config = {}//配置参数
    ) {
        let newParams = {};
        if (params && isFormData) {
            newParams = new FormData();
            for (let i in params) {
                newParams.append(i, params[i])
            }
        } else {
            newParams = params;
        }

        let response = {}
        if (api.method === 'put' || api.method === 'patch' || api.method === 'post') {
            try {
                response = await fetch[api.method](api.url, qs.stringify(newParams), config)
            } catch (e) {
                response = e
            }
        } else if (api.method === 'delete' || api.method === 'get') {
            config.params = newParams
            try {
                response = await fetch[api.method](api.url, config)
            } catch (e) {
                response = e
            }
        }
        return response;
    }
}

//拦截器的添加
fetch.interceptors.request.use((config) => {
    loadingNotice = Notification({
        title: "提示",
        message: "加载中",
        duration: 0
    });
    return config
}, () => {
    loadingNotice = Notification({
        title: "警告",
        message: "加载失败",
        duration: 2000,
        type: 'warning'
    });
})

fetch.interceptors.response.use(res => {
    loadingNotice.close();
    return res.data
}, (err) => {
    loadingNotice.close();
    Notification({
        title: "警告",
        message: err,
        duration: 2000,
        type: 'warning'
    });
})



export default http;