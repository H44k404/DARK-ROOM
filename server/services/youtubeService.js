import { XMLParser } from 'fast-xml-parser';

const CHANNEL_ID = 'UCUYXSaH7gW9DGZHItFsvJ_A';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export const fetchLatestVideos = async () => {
    try {
        const response = await fetch(RSS_URL);
        const xmlData = await response.text();

        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });
        const result = parser.parse(xmlData);

        const entries = result.feed.entry || [];

        return entries.map(entry => ({
            id: entry['yt:videoId'],
            title: entry.title,
            link: entry.link['@_href'],
            thumbnail: `https://i.ytimg.com/vi/${entry['yt:videoId']}/hqdefault.jpg`,
            published: entry.published,
            description: entry['media:group']?.['media:description'] || ''
        }));
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return [];
    }
};
