
/* ==========================================================================
   Sorprese Games Engine
   Autore: Mastropaolo Antonello Salvatore
   Edizione: 2026
   ========================================================================== */
(function(){
"use strict";

// ============================================================
// TASTIERA PIANOFORTE
// ============================================================
var pianoKeyboard = document.getElementById('pianoKeyboard');
var noteDisplay = document.getElementById('noteDisplay');
var octaveRangeSelect = document.getElementById('octaveRange');
var zoomRange = document.getElementById('zoomRange');
var panSlider = document.getElementById('panSlider');
var panVal = document.getElementById('panVal');
var volSlider = document.getElementById('volSlider');
var volVal = document.getElementById('volVal');

var NOTE_NAMES_IT = ['DO','DO#','RE','RE#','MI','FA','FA#','SOL','SOL#','LA','LA#','SI'];
var SEMITONE_RATIOS = [1,1.05946,1.12246,1.18921,1.25992,1.33484,1.41421,1.49831,1.58740,1.68179,1.78180,1.88775];
var currentTimbre = 'sine';
var currentPan = 0;
var currentVolume = 0.5;

var TIMBRI = [
  { id: 'sine', name: 'Sinusoide', wave: 'sine', harm: [1], gain: 1 },
  { id: 'triangle', name: 'Triangolo', wave: 'triangle', harm: [1], gain: 1 },
  { id: 'sawtooth', name: 'Dente Sega', wave: 'sawtooth', harm: [1], gain: 1 },
  { id: 'square', name: 'Onda Quadra', wave: 'square', harm: [1], gain: 1 },
  { id: 'organ', name: 'Organo', wave: 'sine', harm: [1,2,3,4], gain: 0.7 },
  { id: 'flute', name: 'Flauto', wave: 'sine', harm: [1,0.3], gain: 1 },
  { id: 'violin', name: 'Violino', wave: 'sawtooth', harm: [1,0.6,0.4,0.2], gain: 0.7 },
  { id: 'piano', name: 'Piano', wave: 'triangle', harm: [1,0.5,0.3,0.15,0.08], gain: 0.9 },
  { id: 'guitar', name: 'Chitarra', wave: 'triangle', harm: [1,0.7,0.4,0.2], gain: 0.8 },
  { id: 'bell', name: 'Campana', wave: 'sine', harm: [1,2,3,4.2,5.4], gain: 0.6 },
  { id: 'brass', name: 'Ottone', wave: 'sawtooth', harm: [1,0.8,0.6,0.4,0.2], gain: 0.7 },
  { id: 'strings', name: 'Archi', wave: 'sawtooth', harm: [1,0.5,0.3,0.2,0.1], gain: 0.8 },
  { id: 'pad', name: 'Pad', wave: 'sine', harm: [1,0.4,0.2,0.1], gain: 0.9 },
  { id: 'pluck', name: 'Pluck', wave: 'triangle', harm: [1,0.8,0.6,0.4,0.2,0.1], gain: 0.8 },
  { id: 'bass', name: 'Basso', wave: 'sine', harm: [1,0.5,0.25], gain: 1.2 },
  { id: 'lead', name: 'Lead', wave: 'square', harm: [1,0.6,0.4,0.2], gain: 0.7 }
];
var currentTimbreObj = TIMBRI[0];

var KEY_MAP = {
'z':0,'s':1,'x':2,'d':3,'c':4,'v':5,'g':6,'b':7,'h':8,'n':9,'j':10,'m':11,
'q':12,'2':13,'w':14,'3':15,'e':16,'r':17,'5':18,'t':19,'6':20,'y':21,'7':22,'u':23,
'i':24,'9':25,'o':26,'0':27,'p':28
};

function buildTimbriGrid(){
  var grid = document.getElementById('timbriGrid');
  grid.innerHTML = '';
  TIMBRI.forEach(function(t){
    var b = document.createElement('button');
    b.className = 'preset-btn-timbro' + (t.id === currentTimbre ? ' active' : '');
    b.textContent = t.name;
    b.type = 'button';
    b.addEventListener('click', function(){
      currentTimbre = t.id;
      currentTimbreObj = t;
      document.querySelectorAll('.preset-btn-timbro').forEach(function(x){ x.classList.remove('active'); });
      b.classList.add('active');
      if (window.AudioEngine) AudioEngine.ensure();
    });
    grid.appendChild(b);
  });
}
buildTimbriGrid();

volSlider.addEventListener('input', function(){
  currentVolume = parseInt(this.value) / 100;
  volVal.textContent = Math.round(currentVolume * 100) + '%';
  if (window.AudioEngine) AudioEngine.setVolume(currentVolume);
});

panSlider.addEventListener('input', function(){
  currentPan = parseInt(this.value) / 100;
  if (currentPan < -0.1) panVal.textContent = 'L ' + Math.abs(Math.round(currentPan * 100));
  else if (currentPan > 0.1) panVal.textContent = 'R ' + Math.round(currentPan * 100);
  else panVal.textContent = 'C';
  if (window.AudioEngine) AudioEngine.setPan(currentPan);
});

function buildKeyboard(){
  pianoKeyboard.innerHTML = '';
  var octaves = parseInt(octaveRangeSelect.value);
  var zoom = parseInt(zoomRange.value);
  var totalNotes = octaves * 12;
  var baseOctave = 6 - octaves;
  if (baseOctave < 1) baseOctave = 1;
  var allNotes = [];
  for (var i = 0; i < totalNotes; i++) {
    var noteNameIt = NOTE_NAMES_IT[i % 12];
    var octave = baseOctave + Math.floor(i / 12);
    allNotes.push({
      name: noteNameIt,
      freq: 261.63 * Math.pow(2, octave - 4) * SEMITONE_RATIOS[i % 12],
      isBlack: noteNameIt.indexOf('#') !== -1,
      octave: octave,
      index: i
    });
  }
  var whiteIndex = 0;
  allNotes.forEach(function(note){
    if (!note.isBlack) { note.whiteIndex = whiteIndex; whiteIndex++; }
    else { note.whiteIndex = whiteIndex - 0.5; }
  });
  var whiteCount = whiteIndex;
  var minWidth = whiteCount * zoom * 1.0;
  pianoKeyboard.style.minWidth = Math.max(600, minWidth) + 'px';
  allNotes.forEach(function(note){
    var key = document.createElement('div');
    key.className = 'piano-key ' + (note.isBlack ? 'black' : 'white');
    key.dataset.freq = note.freq;
    key.dataset.name = note.name;
    key.dataset.octave = note.octave;
    key.dataset.index = note.index;
    if (note.isBlack) {
      key.style.left = ((note.whiteIndex + 0.7) / whiteCount * 100) + '%';
      key.style.width = (0.6 / whiteCount * 100) + '%';
    }
    if (note.name === 'DO') {
      key.innerHTML = '<span class="label">' + note.name + note.octave + '</span>';
    }
    key.addEventListener('pointerdown', function(e){
      e.preventDefault();
      if (e.button === 2) return;
      playNote(note.freq, note.name, note.octave, key);
      try { key.setPointerCapture(e.pointerId); } catch(err){}
    });
    key.addEventListener('contextmenu', function(e){ e.preventDefault(); });
    pianoKeyboard.appendChild(key);
  });
}

function playNote(freq, name, octave, keyEl){
  if (!window.AudioEngine) return;
  AudioEngine.ensure();
  AudioEngine.resumeContext().then(function(){
    AudioEngine.toneWithTimbre(freq, 1.5, currentTimbreObj, currentVolume, currentPan);
    keyEl.classList.add('active');
    if (noteDisplay) noteDisplay.textContent = name + octave + ' (' + Math.round(freq) + ' Hz)';
    updateFreqLabel(freq);
    updateStaff(name, octave);
    setTimeout(function(){ keyEl.classList.remove('active'); }, 300);
  }).catch(function(e){ console.warn('Audio resume failed:', e); });
}

document.addEventListener('keydown', function(e){
  if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'SELECT')) return;
  var k = e.key.toLowerCase();
  if (!(k in KEY_MAP)) return;
  if (e.repeat) return;
  var noteIndex = KEY_MAP[k];
  var octaves = parseInt(octaveRangeSelect.value);
  if (noteIndex >= octaves * 12) return;
  var keyEls = pianoKeyboard.querySelectorAll('.piano-key');
  var targetKey = null;
  for (var i = 0; i < keyEls.length; i++) {
    if (parseInt(keyEls[i].dataset.index) === noteIndex) { targetKey = keyEls[i]; break; }
  }
  if (targetKey) {
    playNote(parseFloat(targetKey.dataset.freq), targetKey.dataset.name, targetKey.dataset.octave, targetKey);
  }
});

octaveRangeSelect.addEventListener('change', buildKeyboard);
zoomRange.addEventListener('input', buildKeyboard);
buildKeyboard();

var staffNoteTreble = document.getElementById('staffNoteTreble');
var staffNoteBass = document.getElementById('staffNoteBass');

var treblePositions = {
'DO4':115,'DO#4':115,'RE4':110,'RE#4':110,'MI4':100,'FA4':95,'FA#4':95,
'SOL4':85,'SOL#4':85,'LA4':80,'LA#4':80,'SI4':75,
'DO5':70,'DO#5':70,'RE5':65,'RE#5':65,'MI5':55,'FA5':50,'FA#5':50,
'SOL5':40,'SOL#5':40,'LA5':35,'LA#5':35,'SI5':30,
'DO6':25,'DO#6':25
};

var bassPositions = {
'DO1':240,'DO#1':240,'RE1':235,'RE#1':235,'MI1':225,'FA1':220,'FA#1':220,
'SOL1':210,'SOL#1':210,'LA1':205,'LA#1':205,'SI1':200,
'DO2':195,'DO#2':195,'RE2':190,'RE#2':190,'MI2':180,'FA2':175,'FA#2':175,
'SOL2':165,'SOL#2':165,'LA2':160,'LA#2':160,'SI2':155,
'DO3':150,'DO#3':150,'RE3':145,'RE#3':145,'MI3':135,'FA3':130,'FA#3':130,
'SOL3':120,'SOL#3':120,'LA3':115,'LA#3':115,'SI3':110
};

function updateStaff(noteName, octave){
  var key = noteName + octave;
  staffNoteTreble.setAttribute('opacity', '0');
  staffNoteBass.setAttribute('opacity', '0');
  if (treblePositions[key]) {
    staffNoteTreble.setAttribute('cx', 200);
    staffNoteTreble.setAttribute('cy', treblePositions[key]);
    staffNoteTreble.setAttribute('opacity', '1');
  } else if (bassPositions[key]) {
    staffNoteBass.setAttribute('cx', 200);
    staffNoteBass.setAttribute('cy', bassPositions[key]);
    staffNoteBass.setAttribute('opacity', '1');
  }
}

function updateFreqLabel(freq){
  var label = document.getElementById('freqLabel');
  if (label) {
    var colorName = freq < 400 ? 'Ambra' : freq < 500 ? 'Verde' : freq < 600 ? 'Viola' : freq < 700 ? 'Blu' : 'Magenta';
    label.textContent = Math.round(freq) + ' Hz - ' + colorName;
  }
}

// ============================================================
// EQUALIZZATORE FREQUENZE
// ============================================================
var freqCanvas = document.getElementById('freqCanvas');
var freqCtx = freqCanvas.getContext('2d');
function resizeFreqCanvas(){
  var rect = freqCanvas.getBoundingClientRect();
  var dpr = window.devicePixelRatio || 1;
  freqCanvas.width = rect.width * dpr;
  freqCanvas.height = rect.height * dpr;
  freqCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeFreqCanvas();
window.addEventListener('resize', resizeFreqCanvas);

function drawFreqDiagram(){
  var w = freqCanvas.width / (window.devicePixelRatio || 1);
  var h = freqCanvas.height / (window.devicePixelRatio || 1);
  freqCtx.clearRect(0, 0, w, h);
  var analyser = window.AudioEngine ? AudioEngine.getAnalyser() : null;
  var data = null;
  if (analyser) {
    data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
  }
  var bars = 48;
  var barW = w / bars;
  for (var i = 0; i < bars; i++) {
    var val = 0.05;
    if (data) {
      var idx = Math.floor(i * (data.length / bars));
      val = Math.max(0.05, data[idx] / 255);
    }
    var barH = val * h * 0.95;
    var hue = 180 + (i / bars) * 180;
    var grad = freqCtx.createLinearGradient(0, h - barH, 0, h);
    grad.addColorStop(0, 'hsl(' + hue + ', 100%, 70%)');
    grad.addColorStop(1, 'hsl(' + hue + ', 100%, 40%)');
    freqCtx.fillStyle = grad;
    freqCtx.globalAlpha = 0.5 + val * 0.5;
    freqCtx.fillRect(i * barW, h - barH, barW - 1, barH);
  }
  freqCtx.globalAlpha = 1;
  requestAnimationFrame(drawFreqDiagram);
}
drawFreqDiagram();

// ============================================================
// MEMORIA OPERE (IndexedDB)
// ============================================================
var db = null;
function initDB(){
  if (!window.indexedDB) return;
  var request = indexedDB.open('NullSectorDB', 1);
  request.onupgradeneeded = function(e){
    var database = e.target.result;
    if (!database.objectStoreNames.contains('opere')) {
      database.createObjectStore('opere', { keyPath: 'id', autoIncrement: true });
    }
  };
  request.onsuccess = function(e){ db = e.target.result; loadMemory(); };
}
initDB();

function saveOpera(tipo, dati){
  if (!db) return;
  var tx = db.transaction('opere', 'readwrite');
  tx.objectStore('opere').add({ tipo: tipo, dati: dati, timestamp: Date.now() });
  tx.oncomplete = function(){ loadMemory(); };
}

function loadMemory(){
  var list = document.getElementById('memoryList');
  if (!db || !list) return;
  var tx = db.transaction('opere', 'readonly');
  var req = tx.objectStore('opere').getAll();
  req.onsuccess = function(){
    var items = req.result;
    if (items.length === 0) { list.innerHTML = '<p style="color:var(--text-muted)">Nessuna opera salvata.</p>'; return; }
    list.innerHTML = '';
    items.forEach(function(item){
      var div = document.createElement('div');
      div.className = 'memory-item';
      var data = new Date(item.timestamp).toLocaleString();
      div.innerHTML = '<span>' + item.tipo + ' - ' + data + '</span><button data-id="' + item.id + '">X</button>';
      div.querySelector('button').addEventListener('click', function(){
        var id = parseInt(this.dataset.id);
        var tx2 = db.transaction('opere', 'readwrite');
        tx2.objectStore('opere').delete(id);
        tx2.oncomplete = function(){ loadMemory(); };
      });
      list.appendChild(div);
    });
  };
}

document.getElementById('clearMemory').addEventListener('click', function(){
  if (!db) return;
  var tx = db.transaction('opere', 'readwrite');
  tx.objectStore('opere').clear();
  tx.oncomplete = function(){ loadMemory(); };
});

document.getElementById('saveComposition').addEventListener('click', function(){
  var note = prompt('Nome composizione:', 'Composizione ' + new Date().toLocaleTimeString());
  if (note) { saveOpera('composizione', note); alert('Composizione salvata!'); }
});

document.getElementById('recBtn').addEventListener('click', function(){
  if (!window.AudioEngine) return;
  if (!AudioEngine.isRecording()) { AudioEngine.startRecording(); this.textContent = 'STOP'; }
  else { AudioEngine.stopRecording(); this.textContent = 'REGISTRA'; }
});

// ============================================================
// PIXEL MATRIX
// ============================================================
(function(){
  var canvas = document.getElementById('pixelCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var SIZE = 16, CELL = canvas.width / SIZE;
  var color = '#00fff0', drawing = false, erase = false;
  var colors = ['#00fff0','#ff00aa','#a855f7','#00ff88','#ff0040','#ffaa00','#ffffff','#6b5a8a','#ff66cc','#66ccff'];
  var palette = document.getElementById('palette');
  colors.forEach(function(c, i){
    var sw = document.createElement('button');
    sw.className = 'swatch' + (i === 0 ? ' active' : '');
    sw.style.background = c;
    sw.style.color = c;
    sw.type = 'button';
    sw.addEventListener('click', function(){
      if (window.AudioEngine) AudioEngine.click();
      document.querySelectorAll('.swatch').forEach(function(s){ s.classList.remove('active'); });
      sw.classList.add('active');
      color = c;
    });
    palette.appendChild(sw);
  });
  function clear(){ ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  clear();
  function getCell(e){
    var r = canvas.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    var y = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
    return { cx: Math.floor(x / (r.width / SIZE)), cy: Math.floor(y / (r.height / SIZE)) };
  }
  function paint(e){
    var cell = getCell(e);
    if (cell.cx < 0 || cell.cx >= SIZE || cell.cy < 0 || cell.cy >= SIZE) return;
    ctx.fillStyle = erase ? '#000' : color;
    ctx.fillRect(cell.cx * CELL, cell.cy * CELL, CELL, CELL);
    if (window.AudioEngine) AudioEngine.paint();
  }
  canvas.addEventListener('pointerdown', function(e){ if (e.button === 2) erase = true; drawing = true; try { canvas.setPointerCapture(e.pointerId); } catch(err){} paint(e); e.preventDefault(); });
  canvas.addEventListener('pointermove', function(e){ if (drawing) paint(e); });
  canvas.addEventListener('pointerup', function(){ drawing = false; erase = false; });
  canvas.addEventListener('contextmenu', function(e){ e.preventDefault(); });
  document.getElementById('clearPixels').addEventListener('click', function(){ clear(); });
  document.getElementById('exportPng').addEventListener('click', function(){
    var a = document.createElement('a');
    a.download = 'null-sector-pixel.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });
})();

// ============================================================
// FREQUENCY LAB 10D
// ============================================================
(function(){
  var grid = document.getElementById('noteGrid');
  if (!grid) return;
  var NOTES = ['DO','RE','MI','FA','SOL','LA','SI'];
  var RATIOS = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8];
  var bf = document.getElementById('baseFreq'), bv = document.getElementById('baseFreqVal');
  var vol = document.getElementById('volume'), vv = document.getElementById('volumeVal');
  NOTES.forEach(function(n, i){
    var b = document.createElement('button');
    b.className = 'note-btn';
    b.textContent = n;
    b.type = 'button';
    b.addEventListener('click', function(){
      if (!window.AudioEngine) return;
      var f = parseFloat(bf.value) * RATIOS[i];
      var v = parseFloat(vol.value) / 100;
      AudioEngine.tone(f, 1.5, 'sine', v * 0.3);
    });
    grid.appendChild(b);
  });
  bf.addEventListener('input', function(){ bv.textContent = bf.value; });
  vol.addEventListener('input', function(){ vv.textContent = vol.value + '%'; });
})();

// ============================================================
// GIOCHI — engine comune
// ============================================================
(function(){
  var grid = document.getElementById('gamesGrid');
  var modal = document.getElementById('gameModal');
  var title = document.getElementById('gameTitle');
  var content = document.getElementById('gameContent');
  if (!grid) return;

  var SEO_TEXTS = {
    memory: 'Allena la memoria con il classico gioco delle coppie. Quattro livelli di difficoltà, da 2x2 a 5x4. Perfetto per una pausa veloce nel browser, senza download.',
    quiz: 'Quiz a tempo limite con domande su cultura generale. Hai 10 secondi per risposta. Metti alla prova i tuoi riflessi.',
    anagram: 'Anagrammi con aiuti progressivi. Ricomponi parole legate al tema della luce e della crescita.',
    enigma: 'Indovina il numero segreto tra 1 e 100. Il termometro ti dice se sei vicino o lontano.',
    dice: 'Dado a 6 facce con statistiche in tempo reale. Lancia e accumula fortuna.',
    draw: 'Riproduci il pattern segreto 8x8. Un gioco di memoria visiva e precisione.',
    tetris: 'Il classico Tetris in versione dimensionale con effetti neon. Ruota e incastra i pezzi per completare le linee.',
    breakout: 'Distruggi tutti i mattoncini con la pallina. Muovi la racchetta con le frecce o i bottoni.',
    train: 'Cambia binario al passaggio del treno per evitare gli ostacoli. Un gioco di riflessi con audio sintetizzato.',
    volo: 'Simulatore di volo 3D con fisica semplificata. Vola sopra il terreno, cambia vista, controlla throttle e pitch. Si apre in una nuova pagina.',
    snake: 'Il serpente classico: mangia, cresci, non morderti la coda. Versione neon con velocità crescente.',
    pong: 'Pong contro AI dimensionale. Sfida il computer in una partita a 5 punti.',
    invaders: 'Space Invaders dimensionale: distruggi l\'ondata di alieni prima che ti colpiscano.',
    sudoku: 'Sudoku 9x9 con verifica integrata. Clicca una cella e digita 1-9.',
    classifica: 'I tuoi record migliori salvati in locale. Nessun account, nessun server: tutto resta nel tuo browser.',
    tris: 'Il gioco del tris contro un\'AI che gioca per vincere. Riesci a batterla?',
    jipong: 'Pong potenziato con due palline e ostacoli centrali. Sfida l\'AI in una partita a 5 punti.',
    pacman: 'Pac-Man unico con laser, combo multiplier e labirinto glitch. Mangia i puntini, evita i fantasmi, e usa il laser per eliminare quelli sulla tua linea.'
  };

  var GAMES = [
    { id: 'memory', emoji: 'A', title: 'MEMORY', desc: 'Memory progressivo con 4 livelli' },
    { id: 'quiz', emoji: 'B', title: 'TEMPO', desc: 'Quiz con tempo limite' },
    { id: 'anagram', emoji: 'C', title: 'NUVOLE', desc: 'Anagrammi con aiuti progressivi' },
    { id: 'enigma', emoji: 'D', title: 'ENIGMA', desc: 'Indovina con termometro' },
    { id: 'dice', emoji: 'E', title: 'DADO', desc: 'Dado a 6 facce + statistiche' },
    { id: 'draw', emoji: 'F', title: 'SOGNI', desc: 'Pattern 8x8 da riprodurre' },
    { id: 'tetris', emoji: 'G', title: 'TETRIS', desc: 'Tetris dimensionale con neon' },
    { id: 'breakout', emoji: 'H', title: 'BREAKOUT', desc: 'Distruggi i mattoncini dimensionali' },
    { id: 'train', emoji: 'I', title: 'TRENO', desc: 'Scambia i binari al passaggio del treno' },
    { id: 'volo', emoji: 'J', title: 'VOLO', desc: 'Simulatore di volo 3D - apri in nuova pagina' },
    { id: 'snake', emoji: 'K', title: 'SNAKE', desc: 'Serpente dimensionale con neon' },
    { id: 'pong', emoji: 'L', title: 'PONG', desc: 'Pong contro AI dimensionale' },
    { id: 'invaders', emoji: 'M', title: 'INVADERS', desc: 'Space Invaders dimensionale' },
    { id: 'sudoku', emoji: 'N', title: 'SUDOKU', desc: 'Sudoku 9x9 con verifica' },
    { id: 'classifica', emoji: 'O', title: 'CLASSIFICA', desc: 'Record salvati in locale' },
    { id: 'tris', emoji: 'P', title: 'TRIS', desc: 'Tris 3x3 contro AI' },
    { id: 'jipong', emoji: 'Q', title: 'JIPONG', desc: 'Pong potenziato con 2 palline e ostacoli' },
    { id: 'pacman', emoji: 'R', title: 'NULL PAC-MAN', desc: 'Pac-Man con laser, combo e glitch' }
  ];

  var currentCleanup = null;
  function registerCleanup(fn) { if (currentCleanup) currentCleanup(); currentCleanup = fn; }

  function saveScore(game, score){
    var scores = JSON.parse(localStorage.getItem('nullSectorScores') || '{}');
    if (!scores[game] || score > scores[game]) {
      scores[game] = score;
      localStorage.setItem('nullSectorScores', JSON.stringify(scores));
    }
  }

  GAMES.forEach(function(g){
    var c = document.createElement('div');
    c.className = 'game-card';
    c.innerHTML = '<div class="emoji" aria-hidden="true">' + g.emoji + '</div><h3>' + g.title + '</h3><p>' + g.desc + '</p><button class="btn magenta" data-game="' + g.id + '">PLAY</button><p class="seo-text">' + (SEO_TEXTS[g.id] || '') + '</p>';
    grid.appendChild(c);
  });

  function open(t, h){
    if (window.AudioEngine) AudioEngine.open();
    title.textContent = t;
    content.innerHTML = h;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (window.unlockAchievement) unlockAchievement('first_game');
  }
  function close(){
    if (currentCleanup) { currentCleanup(); currentCleanup = null; }
    if (window.AudioEngine) AudioEngine.close();
    modal.hidden = true;
    document.body.style.overflow = '';
    content.innerHTML = '';
  }
  document.getElementById('gameClose').addEventListener('click', close);
  modal.addEventListener('click', function(e){ if (e.target === modal) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !modal.hidden) close(); });
  grid.addEventListener('click', function(e){
    var b = e.target.closest('[data-game]');
    if (!b) return;
    var id = b.getAttribute('data-game');
    if (id === 'memory') openMemory();
    else if (id === 'quiz') openQuiz();
    else if (id === 'anagram') openAnagramGame();
    else if (id === 'enigma') openEnigma();
    else if (id === 'dice') openDice();
    else if (id === 'draw') openDraw();
    else if (id === 'tetris') openTetris();
    else if (id === 'breakout') openBreakout();
    else if (id === 'train') openTrain();
    else if (id === 'volo') window.open('volo.html', '_blank');
    else if (id === 'snake') openSnake();
    else if (id === 'pong') openPong();
    else if (id === 'invaders') openInvaders();
    else if (id === 'sudoku') openSudoku();
    else if (id === 'classifica') openClassifica();
    else if (id === 'tris') openTris();
    else if (id === 'jipong') openJiPong();
    else if (id === 'pacman') openPacman();
  });

  function openMemory(){
    var diffs = { easy: {cols:2,rows:2,pairs:2,label:'2x2'}, normal: {cols:4,rows:3,pairs:6,label:'4x3'}, hard: {cols:4,rows:4,pairs:8,label:'4x4'}, extreme: {cols:5,rows:4,pairs:10,label:'5x4'} };
    var currentDiff = 'normal';
    var timer = null;
    function start(){
      if (timer) { clearInterval(timer); timer = null; }
      var d = diffs[currentDiff];
      var syms = ['A','B','C','D','E','F','G','H','I','J'].slice(0, d.pairs);
      var deck = syms.concat(syms).sort(function(){ return Math.random() - 0.5; });
      var flipped = [], matched = 0, moves = 0, startTime = Date.now();
      var html = '<div class="difficulty-row">';
      Object.keys(diffs).forEach(function(k){ html += '<button class="diff-btn' + (k === currentDiff ? ' active' : '') + '" data-diff="' + k + '">' + diffs[k].label + '</button>'; });
      html += '</div>';
      html += '<p style="text-align:center;color:#94a3b8;font-size:0.85rem">Mosse: <strong id="memMoves">0</strong> - Tempo: <strong id="memTime">0s</strong></p>';
      html += '<div class="mem-grid" id="mg" style="grid-template-columns:repeat(' + d.cols + ',1fr)"></div>';
      open('MEMORY', html);
      var mg = document.getElementById('mg');
      document.querySelectorAll('.diff-btn').forEach(function(btn){
        btn.addEventListener('click', function(){ currentDiff = btn.getAttribute('data-diff'); start(); });
      });
      function renderGrid(){
        mg.innerHTML = '';
        deck.forEach(function(s, i){
          var c = document.createElement('button');
          c.className = 'mem-card';
          if (flipped.indexOf(i) !== -1) { c.classList.add('flipped'); c.textContent = s; }
          c.addEventListener('click', function(){ click(i); });
          mg.appendChild(c);
        });
      }
      function click(i){
        if (flipped.indexOf(i) !== -1 || flipped.length === 2) return;
        if (window.AudioEngine) AudioEngine.flip();
        flipped.push(i); renderGrid();
        if (flipped.length === 2) {
          moves++; document.getElementById('memMoves').textContent = moves;
          var a = flipped[0], b = flipped[1];
          if (deck[a] === deck[b]) {
            if (window.AudioEngine) AudioEngine.match();
            matched += 2;
            setTimeout(function(){
              var all = mg.querySelectorAll('.mem-card');
              for (var k = 0; k < all.length; k++) { if (deck[k] === deck[a]) all[k].classList.add('matched'); }
              flipped = [];
              if (matched === deck.length) {
                if (timer) { clearInterval(timer); timer = null; }
                var elapsed = Math.floor((Date.now() - startTime) / 1000);
                saveScore('memory', Math.max(0, 1000 - moves * 10 - elapsed * 2));
                if (window.unlockAchievement) unlockAchievement('memory_win');
                setTimeout(function(){
                  if (window.AudioEngine) AudioEngine.win();
                  content.innerHTML = '<div style="text-align:center;padding:20px 0"><p style="font-size:40px">WIN</p><p style="color:#00ff88;font-weight:900">VINTO!</p><p style="color:#f1d18b">Mosse: ' + moves + ' - Tempo: ' + elapsed + 's</p><div class="center-btns"><button class="btn-big btn-cyan" id="memRestart">RIGIOCA</
