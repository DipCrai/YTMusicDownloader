function Cobalt(videoUrl, audioOnly = false) {
    return new Promise((resolve, reject) => {
        fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: encodeURI(videoUrl),
                vQuality: localStorage.getItem('ytdl-quality') ?? 'max',
                filenamePattern: 'basic', // file name = video title
                isAudioOnly: audioOnly,
                disableMetadata: true, // privacy
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data?.url) resolve(data.url);
            else reject(data);
        })
        .catch(err => reject(err));
    });
}