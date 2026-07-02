require('dotenv').config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const scopes = 'user-top-read';

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

console.log('\nClique no link abaixo para autorizar o app:\n');
console.log(authUrl);
console.log('\n');