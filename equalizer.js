// HTML setup
// <audio id="audioPlayer" controls></audio>
// <canvas id="equalizerCanvas"></canvas>

// JavaScript setup
const audioPlayer = document.getElementById('audioPlayer');
const equalizerCanvas = document.getElementById('equalizerCanvas');
const canvasCtx = equalizerCanvas.getContext('2d');

// Set up audio context and analyser
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audioPlayer);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Set up the equalizer effect
analyser.fftSize = 256; // Change this value for more or less bars
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Function to draw the equalizer
function drawEqualizer() {
  requestAnimationFrame(drawEqualizer);
  
  analyser.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasCtx.fillRect(0, 0, equalizerCanvas.width, equalizerCanvas.height);

  const barWidth = (equalizerCanvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for(let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
    canvasCtx.fillRect(x, equalizerCanvas.height - barHeight / 2, barWidth, barHeight / 2);

    x += barWidth + 1;
  }
}

drawEqualizer();
