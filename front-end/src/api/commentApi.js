import axiosClient from "./axiosClient";
const token = localStorage.getItem("token");

const commentApi = {
    getAll: () => {
        const url = '/v1/comments';
        return axiosClient.get(url, { 
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    postOne: (params) => {
        const url = '/v1/comments';
        return axiosClient.post(url, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    deleteComment: (id) => {
        const url = `/v1/comments/${id}`;
        return axiosClient.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
}

export default commentApi;
