require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

async function getTopTracks() {
    try {
        const authHeader = 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64');
        
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', 
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
            }).toString(), 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': authHeader
                }
            }
        );

        const accessToken = tokenResponse.data.access_token;

        const tracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const tracks = tracksResponse.data.items.map(track => ({
            name: track.name,
            artist: track.artists.map(a => a.name).join(', '),
            albumImageUrl: track.album.images[0]?.url,
            url: track.external_urls.spotify
        }));

        fs.writeFileSync('tracks.json', JSON.stringify(tracks, null, 2));
        console.log('Arquivo tracks.json atualizado com sucesso!');
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
}

getTopTracks();