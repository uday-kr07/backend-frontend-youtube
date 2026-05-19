import api from "../services/axios";

export const getAllVideos = async (params = {}) => {
    const response = await api.get("/videos", { params });
    return response.data;
};

export const getVideosById = async (videoId) => {
    const response = await api.get(`/videos/${videoId}`);
    return response.data;
};

export const uploadVideoBy = async (formData) => {
    const response = await api.post(
        "/videos",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
};

export const searchVideos = async (query) => {

    const response = await api.get(
        "/videos/search",
        { params: { query } }
    );

    return response.data;
}

export const toggleVideoPublish = async (videoId) => {
    const response = await api.patch(`/videos/toggle/publish/${videoId}`);
    return response.data;
};
