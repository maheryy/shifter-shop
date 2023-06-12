import wretch from "wretch";
import queryString from "wretch/addons/queryString";

const api = wretch("http://localhost:3000").addon(queryString);

export default api;
