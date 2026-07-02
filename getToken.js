require('dotenv').config();
const axios = require('axios');

const code = 'AQBlSiA9tlUROYRaAiwZ0OW9X5gJVSKTVQtVpQr-7IcBB6TIjHnI0XBo5r1Q4VLG5L8o3Ju-LIXuTx2xGX1HmiQJQx_5NKQx_6upFtUn0ORPEnUNLYnz54noZBUm8ei4h505hbf4F5FVVXWcygJQdAEg7BsK5607mYe5LJ-va3jQP5lib-C5j_M12BfYAMKks-r3rLP9ZRUVc4VUga_kU5jkBDEE7IsjWiYU4mAv1SE0f5Zr8XEYBf9883PGs3roUEEikNW7YA';

async function getRefreshToken() {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
            }
        });
        console.log('\nSEU REFRESH TOKEN:\n');
        console.log(response.data.refresh_token);
        console.log('\n');
    } catch (error) {
        console.error('Erro na geração:', error.response ? error.response.data : error.message);
    }
}

getRefreshToken();