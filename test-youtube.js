import * as youtubeService from './server/services/youtubeService.js';

async function test() {
    console.log('Testing YouTube service...');
    try {
        const videos = await youtubeService.fetchLatestVideos();
        console.log('Fetched videos count:', videos.length);
        if (videos.length > 0) {
            console.log('First video:', JSON.stringify(videos[0], null, 2));
        } else {
            console.log('No videos fetched.');
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test();
