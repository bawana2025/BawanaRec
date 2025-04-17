document.addEventListener('DOMContentLoaded', () => {
  const voiceList = document.getElementById('voiceList');

  // Static list of mp3 files (Example)
  const audioFiles = [
    "voices/voice1.mp3",
    
    
  ];

  audioFiles.forEach(filePath => {
    const fileName = filePath.split('/').pop();

    const item = document.createElement('div');
    item.className = 'voice-item';

    item.innerHTML = `
      <div class="voice-info">
        <p class="voice-name">${fileName}</p>
      </div>
      <audio src="${filePath}" preload="metadata"></audio>
      <button class="play-btn">Play</button>
    `;

    const playBtn = item.querySelector('.play-btn');
    const audio = item.querySelector('audio');

    playBtn.addEventListener('click', () => {
      document.querySelectorAll('audio').forEach(a => {
        if (a !== audio) {
          a.pause();
          a.parentElement.querySelector('.play-btn').textContent = 'Play';
          a.parentElement.querySelector('.play-btn').classList.remove('playing');
        }
      });

      if (audio.paused) {
        audio.play()
          .then(() => {
            playBtn.textContent = 'Stop';
            playBtn.classList.add('playing');
          })
          .catch(error => {
            console.error("Error playing audio:", error);
          });
      } else {
        audio.pause();
        playBtn.textContent = 'Play';
        playBtn.classList.remove('playing');
      }
    });

    audio.addEventListener('ended', () => {
      playBtn.textContent = 'Play';
      playBtn.classList.remove('playing');
    });

    voiceList.appendChild(item);
  });
});
