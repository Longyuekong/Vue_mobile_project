//axios发送请求的封装
import axios from 'axios'
import store from '@/store'
//设置基地址
const myReq = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/app/"
})
//设置请求拦截器
myReq.interceptors.request.use(config => {
    // Do something before request is sent
    //判断token是否为空,如果为空,则为未登录
    let res = store.state.user; //拿到store中state的数据
    if (res && res.token) {
        config.headers.Authorization = `Bearer ${res.token}`
    }
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// 设置响应拦截器
myReq.interceptors.response.use(function (response) {
    //这里相当于过滤操作,直接拿其中的数据
    return response.data.data || response.data;
}, function (error) {
    return Promise.reject(error);
});
//暴露接口
export default myReq;