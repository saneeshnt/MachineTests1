import axios from "axios"

const userInstance = axios.create({
    baseURL: "https://mini-project-backend-nv1x.onrender.com/"
});

userInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("jwt");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
});

export { userInstance }