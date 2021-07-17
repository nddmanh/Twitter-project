import axiosClient from "./axiosClient";
const token = localStorage.getItem("token");

const postApi = {
    getAll: (params) => {
        const url = '/v1/posts';
        return axiosClient.get(url, { 
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    postOne: (params) => {
        const url = '/v1/posts';
        return axiosClient.post(url, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    updatePost: (id, params) => {
        const url = `/v1/posts/${id}`;
        return axiosClient.put(url, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    deletePost: (id) => {
        const url = `/v1/posts/${id}`;
        return axiosClient.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    getCountLike: (id) => {
        const url = `/v1/posts/count/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    getLikePost: (id) => {
        const url = `/v1/posts/like/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    getUnlikePost: (id) => {
        const url = `/v1/posts/unlike/${id}`;
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

}

export default postApi;
