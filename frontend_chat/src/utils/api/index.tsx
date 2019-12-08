import axios from "axios";

const api = axios.create({
    baseURL: "http://rchat.docker/api/",
    responseType: "json"
});

declare global {
  interface Window {
    AUTH: any ;
  }
}
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
api.defaults.withCredentials = true;
if(window.AUTH){
    localStorage.setItem('token', window.AUTH.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${window.AUTH.token}`;
} else {
    localStorage.removeItem('token');
}
export default api;


