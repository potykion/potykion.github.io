function main() {
    const videos = getPlaylistVideos("PLRQwloIf-xS-PWGAytv_U1HUJ6U8BvSiP");
    videos.forEach(v => console.log(JSON.stringify(v)));
}

function getPlaylistVideos(playlistId) {
    // [{url, title, description}]
    let videos = [];

    let pageToken = '';
    while (true) {
        // https://developers.google.com/youtube/v3/docs/playlistItems/list
        // https://developers.google.com/apps-script/advanced/youtube
        const resp = YouTube.PlaylistItems.list(
            'snippet',
            {
                playlistId,
                maxResults: 50,
                pageToken,
            },
        );
        videos = [
            ...videos,
            ...resp.items.map(i => ({
                url: `https://youtu.be/${i.snippet.resourceId.videoId}`,
                title: i.snippet.title,
                description: i.snippet.description,
            })),
        ];
        pageToken = resp.nextPageToken;
        if (!pageToken) {
            break;
        }
    }

    return videos;
}


