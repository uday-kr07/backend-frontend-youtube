export const formatViews = (views = 0) => {
    const value = Number(views) || 0;

    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(value >= 10000000 ? 0 : 1)}M`;
    }

    if (value >= 1000) {
        return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
    }

    return value.toString();
};
