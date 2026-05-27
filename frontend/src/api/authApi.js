import api from "../services/axios";


export const loginUser = async (formData) => {

    const response = await api.post(
        "/users/login",
        formData
    );

    return response.data;
};


export const registerUser = async (formData) => {

    const response = await api.post(
        "/users/register",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post("/users/logout");
    return response.data;
};

export const updateAccountDetails = async (payload) => {
    const response = await api.patch("/users/update-account", payload);
    return response.data;
};

export const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.patch("/users/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateCoverImage = async (file) => {
    const formData = new FormData();
    formData.append("coverImage", file);

    const response = await api.patch("/users/coverImage", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deleteAccount = async () => {
    const response = await api.delete("/users/delete-account");
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get("/users/current-user");
    return response.data;
};

export const getChannelProfile = async (username) => {
    const response = await api.get(`/users/c/${username}`);
    return response.data;
};

export const getWatchHistory = async () => {
    const response = await api.get("/users/history");
    return response.data;
};
