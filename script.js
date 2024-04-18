let lyrics = [];
let currentTimeIndex = 0;

document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    processMP3(file);
  }
});

function processMP3(file) {
  jsmediatags.read(file, {
    onSuccess: function(tag) {
      const { title, artist, picture, lyrics: embeddedLyrics } = tag.tags;
      document.getElementById('title').textContent = title || 'Unknown Title';
      document.getElementById('artist').textContent = artist || 'Unknown Artist';

      if (picture) {
        let base64String = "";
        for (let i = 0; i < picture.data.length; i++) {
          base64String += String.fromCharCode(picture.data[i]);
        }
        const imageUrl = "data:" + picture.format + ";base64," + window.btoa(base64String);
        document.getElementById('cover').style.backgroundImage = `url(${imageUrl})`;
      }

      if (embeddedLyrics && embeddedLyrics.lyrics) {
        parseLyrics(embeddedLyrics.lyrics);
      }

      const objectUrl = URL.createObjectURL(file);
      document.getElementById('audio').src = objectUrl;
      document.getElementById('audio').play();
    },
    onError: function(error) {
      console.log(error);
    }
  });
}

function parseLyrics(lyricsString) {
  const lines = lyricsString.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const timeMatch = lines[i].match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);
    const text = lines[i].replace(/\[\d{2}:\d{2}\.\d{2}\]/g, '');
    if (timeMatch) {
      const seconds = parseInt(timeMatch[1]) * 60 + parseInt(timeMatch[2]) + parseInt(timeMatch[3]) / 100;
      lyrics.push({ time: seconds, text: text });
    }
  }
  displayLyrics();
}

function displayLyrics() {
  const lyricsContainer = document.getElementById('lyrics');
  lyricsContainer.innerHTML = '';
  lyrics.forEach((line, index) => {
    const p = document.createElement('p');
    p.classList.add('line');
    p.textContent = line.text;
    p.dataset.time = line.time;
    lyricsContainer.appendChild(p);
  });
}

document.getElementById('audio').addEventListener('timeupdate', function() {
  const currentTime = this.currentTime;
  const lines = document.querySelectorAll('.line');
  if (currentTimeIndex < lyrics.length && currentTime >= lyrics[currentTimeIndex].time) {
    if (currentTimeIndex > 0) {
      lines[currentTimeIndex - 1].classList.remove('active');
    }
    lines[currentTimeIndex].classList.add('active');
    currentTimeIndex++;
  }
});
