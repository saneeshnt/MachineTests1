import { userInstance } from '../axios/axiosInstance'
export const login= (value) =>{
    return userInstance.post("/login",{...value});

}