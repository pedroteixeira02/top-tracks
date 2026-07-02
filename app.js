async function loadTopTracks() {
    const trackList = document.getElementById('track-list');
    
    try {
        const response = await fetch('tracks.json');
        const tracks = await response.json();
        
        const top7Tracks = tracks.slice(0, 7);
        
        top7Tracks.forEach((track, index) => {
            const a = document.createElement('a');
            a.href = track.url;
            a.target = '_blank';
            a.className = 'track-item';
            
            a.innerHTML = `
                <span class="track-rank">${index + 1}</span>
                <img src="${track.albumImageUrl}" alt="Capa">
                <div class="track-info">
                    <span class="track-name">${track.name}</span>
                    <span class="track-artist">${track.artist}</span>
                </div>
            `;
            
            trackList.appendChild(a);
        });
    } catch (error) {
        trackList.innerHTML = '<p style="text-align:center; color:#ff4444;">Erro ao carregar as músicas.</p>';
    }
}

loadTopTracks();