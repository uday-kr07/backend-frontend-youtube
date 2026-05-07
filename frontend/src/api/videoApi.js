import api from "../services/axios";

export const getAllVideos = async () => {
    const response = await api.get("/videos");
    return response.data;
};

export const getVideposById = async (videoId) => {
    const response = await api.get(`/videos/${videoId}`);
    return response.data;
};

export const uploadVideoBy = async (formData) => {
    const response = await api.post(
        "/videos",
        formData,
        {
            header: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
};