// connecting front-end with back-end
import _axios from 'axios';
const axios = baseUrl => {
    const instance = _axios.create({
        baseURL: baseUrl || 'http://localhost:5000'
        // baseURL: 'https://info30005the-five.herokuapp.com/' || 'http://localhost:5000'
    });
    return instance;
};

export { axios };
export default axios();