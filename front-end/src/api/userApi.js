import axiosClient from "./axiosClient";
const token = localStorage.getItem("token");

const userApi = {
    checkCurrentUser: (params) => {
        const url = '/v1/comments';
        return axiosClient.get(url, { 
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    
}

export default userApi;
