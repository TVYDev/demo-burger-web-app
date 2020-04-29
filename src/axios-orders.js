import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-app-e94ed.firebaseio.com/'
});

export default instance;
