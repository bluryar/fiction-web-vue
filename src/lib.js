import axios from "axios";
import { Message } from "element-ui";

const apiHost =
  process.env.NODE_ENV === "production"
    ? "http://localhost:7001"
    : "http://localhost:7001";

const service = axios.create({
  baseURL: apiHost
});
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          Message({
            showClose: true,
            message: `【400】${JSON.stringify(error.response.data)}`,
            type: "warning",
            offset: 50
          });
          break;
        case 404:
          Message({
            showClose: true,
            message: `【404】资源不存在`,
            type: "warning",
            offset: 50
          });
          break;
        default:
          Message({
            showClose: true,
            message: `${error.response.status}`,
            type: "error",
            offset: 50
          });
          break;
      }
      return;
    }
    return Promise.reject(error);
  }
);

export { service as axios };
