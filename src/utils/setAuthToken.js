import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.common['Content-Type'] = 'text/plain';
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;
