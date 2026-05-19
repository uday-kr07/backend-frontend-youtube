import api from "../services/axios";

export const createPlaylist = async (payload) => {
    const response = await api.post("/playlist", payload);
    return response.data;
};

export const getPlaylistById = async (playlistId) => {
    const response = await api.get(`/playlist/${playlistId}`);
    return response.data;
};

export const updatePlaylist = async (playlistId, payload) => {
    const response = await api.patch(`/playlist/${playlistId}`, payload);
    return response.data;
};

export const deletePlaylist = async (playlistId) => {
    const response = await api.delete(`/playlist/${playlistId}`);
    return response.data;
};

export const addVideoToPlaylist = async (videoId, playlistId) => {
    const response = await api.patch(`/playlist/add/${videoId}/${playlistId}`);
    return response.data;
};

export const removeVideoFromPlaylist = async (videoId, playlistId) => {
    const response = await api.patch(`/playlist/remove/${videoId}/${playlistId}`);
    return response.data;
};

export const getUserPlaylists = async (userId) => {
    const response = await api.get(`/playlist/user/${userId}`);
    return response.data;
};
