import axios from 'axios';

axios.interceptors.request.use(
    request => {
        if(NODE_ENV && NODE_ENV === 'development') {
            request.url = NODE_ENV + request.url;
        }
        return request;
    }, 
    error => {
        return Promise.reject(error);
    }
);