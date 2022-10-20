import axios from "axios";

const serverInstance = axios.create({
    baseURL: 'https://this-is-the-test-3d4bb.firebaseio.com/'
});

export default serverInstance;