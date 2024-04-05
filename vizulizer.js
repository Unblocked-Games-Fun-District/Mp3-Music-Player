// HTML setup
// <audio id="audio" controls></audio>
// <canvas id="canvas"></canvas>

// JavaScript setup
const audio = document.getElementById('audio');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set up audio context and analyser
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Function to draw the visualizer
function draw() {
  const width = canvas.width;
  const height = canvas.height;
  const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  
  analyser.getByteFrequencyData(frequencyData);
  
  ctx.clearRect(0, 0, width, height);
  
  for (let i = 0; i < frequencyData.length; i++) {
    const value = frequencyData[i];
    const percent = value / 256;
    const barHeight = height * percent;
    const offset = height - barHeight - 1;
    const barWidth = width / frequencyData.length;
    
    ctx.fillStyle = 'rgb(' + (value + 100) + ',50,50)';
    ctx.fillRect(i * barWidth, offset, barWidth, barHeight);
  }
  
  requestAnimationFrame(draw);
}

draw();
