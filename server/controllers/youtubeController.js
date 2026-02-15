import * as youtubeService from '../services/youtubeService.js';

export const getLatestVideos = async (req, res) => {
    try {
        const videos = await youtubeService.fetchLatestVideos();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error: error.message });
    }
};
