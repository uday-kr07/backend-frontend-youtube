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