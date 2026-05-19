import api from "../services/axios";

export const toggleSubscription = async (channelId) => {
    const response = await api.post(`/subscriptions/c/${channelId}`);
    return response.data;
};

export const getChannelSubscribers = async (channelId) => {
    const response = await api.get(`/subscriptions/c/${channelId}`);
    return response.data;
};

export const getSubscribedChannels = async (subscriberId) => {
    const response = await api.get(`/subscriptions/u/${subscriberId}`);
    return response.data;
};
