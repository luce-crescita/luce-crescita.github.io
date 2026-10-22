
/* ==========================================================================
   Luce e Crescita X∞ — AudioEngine condiviso (v4)
   Autore: Mastropaolo Antonello Salvatore
   Edizione: 2026
   ========================================================================== */
(function (global) {
    'use strict';

    var ctx = null;
    var master = null;
    var compressor = null;
    var analyser = null;
    var panner = null;
    var recorder = null;
    var recordedChunks = [];
    var recording = false;
    var muted = false;
    var masterVolume = 0.75;
    var unlocked = false;
    var unlockCallbacks = [];

    function installUnlock() {
        if (unlocked) return;
        var handler = function () {
            if (!ctx) return;
            if (ctx.state === 'suspended' || ctx.state === 'interrupted') {
                ctx.resume().then(function () {
                    unlocked = true;
                    var buffer = ctx.createBuffer(1, 1, 22050);
                    var source = ctx.createBufferSource();
                    source.buffer = buffer;
                    source.connect(ctx.destination);
                    source.start(0);
                    unlockCallbacks.forEach(function (cb) { cb(); });
                    unlockCallbacks = [];
                }).catch(function (e) {
                    console.warn('AudioEngine: resume fallito', e);
                });
            } else {
                unlocked = true;
            }
            document.removeEventListener('pointerdown', handler);
            document.removeEventListener('touchend', handler);
            document.removeEventListener('click', handler);
        };
        document.addEventListener('pointerdown', handler, { once: false });
        document.addEventListener('touchend', handler, { once: false });
        document.addEventListener('click', handler, { once: false });
    }

    function ensure() {
        if (!ctx) {
            var AC = global.AudioContext || global.webkitAudioContext;
            if (!AC) { console.warn('AudioEngine: Web Audio API non supportata'); return null; }
            ctx = new AC();
            compressor = ctx.createDynamicsCompressor();
            compressor.threshold.value = -18;
            compressor.knee.value = 20;
            compressor.ratio.value = 4;
            compressor.attack.value = 0.003;
            compressor.release.value = 0.25;

            master = ctx.createGain();
            master.gain.value = muted ? 0 : masterVolume;
            master.connect(compressor);
            compressor.connect(ctx.destination);

            analyser = ctx.createAnalyser();
            analyser.fftSize = 512;
            master.connect(analyser);

            panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
            if (panner) {
                panner.pan.value = 0;
                panner.connect(master);
            }
            installUnlock();
        }
        return ctx;
    }

    function resumeContext() {
        var c = ensure();
        if (!c) return Promise.reject('no ctx');
        if (c.state === 'suspended' || c.state === 'interrupted') return c.resume();
        return Promise.resolve();
    }

    function tone(freq, dur, type, vol, detune) {
        var c = ensure();
        if (!c || muted) return;
        if (c.state !== 'running') {
            unlockCallbacks.push(function () { tone(freq, dur, type, vol, detune); });
            return;
        }
        var o = c.createOscillator();
        var g = c.createGain();
        o.type = type || 'sine';
        o.frequency.value = freq;
        if (detune) o.detune.value = detune;
        g.gain.setValueAtTime(0, c.currentTime);
        g.gain.linearRampToValueAtTime(vol || 0.2, c.currentTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
        o.connect(g); g.connect(panner || master);
        o.onended = function () { try { o.disconnect(); } catch (e) {} try { g.disconnect(); } catch (e) {} };
        o.start(); o.stop(c.currentTime + dur + 0.05);
    }

    function toneWithTimbre(freq, dur, timbre, vol, pan) {
        var c = ensure();
        if (!c || muted) return;
        if (c.state !== 'running') {
            unlockCallbacks.push(function () { toneWithTimbre(freq, dur, timbre, vol, pan); });
            return;
        }
        if (panner && pan !== undefined) {
            panner.pan.setTargetAtTime(Math.max(-1, Math.min(1, pan)), c.currentTime, 0.05);
        }
        var harmonics = timbre.harm || [1];
        var totalGain = (vol || 0.25) * (timbre.gain || 1);
        harmonics.forEach(function (h, i) {
            var o = c.createOscillator();
            var g = c.createGain();
            o.type = timbre.wave || 'sine';
            o.frequency.value = freq * h;
            var hGain = totalGain / (i + 1);
            g.gain.setValueAtTime(0, c.currentTime);
            g.gain.linearRampToValueAtTime(hGain, c.currentTime + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
            o.connect(g); g.connect(panner || master);
            o.onended = function () { try { o.disconnect(); } catch (e) {} try { g.disconnect(); } catch (e) {} };
            o.start(); o.stop(c.currentTime + dur + 0.05);
        });
    }

    function chord(freqs, dur, type, vol) {
        freqs.forEach(function (f, i) {
            setTimeout(function () { tone(f, dur, type, vol); }, i * 30);
        });
    }

    function getAnalyser() { return analyser; }
    function getContext() { return ctx; }

    function toggleMute() {
        muted = !muted;
        if (master && ctx) master.gain.setTargetAtTime(muted ? 0 : masterVolume, ctx.currentTime, 0.05);
        return muted;
    }
    function isMuted() { return muted; }

    function setVolume(v) {
        masterVolume = Math.max(0, Math.min(1, v));
        if (master && ctx && !muted) master.gain.setTargetAtTime(masterVolume, ctx.currentTime, 0.05);
    }
    function getVolume() { return masterVolume; }

    function setPan(p) {
        if (panner && ctx) panner.pan.setTargetAtTime(Math.max(-1, Math.min(1, p)), ctx.currentTime, 0.05);
    }

    function startRecording() {
        var c = ensure();
        if (!c || recording) return null;
        var dest = c.createMediaStreamDestination();
        master.connect(dest);
        recorder = new MediaRecorder(dest.stream);
        recordedChunks = [];
        recorder.ondataavailable = function (e) { if (e.data.size > 0) recordedChunks.push(e.data); };
        recorder.onstop = function () {
            try { master.disconnect(dest); } catch (e) {}
            var mime = recorder.mimeType || 'audio/webm';
            var blob = new Blob(recordedChunks, { type: mime });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            var ext = mime.indexOf('mp4') !== -1 ? 'mp4' : mime.indexOf('webm') !== -1 ? 'webm' : 'bin';
            a.download = 'luce-crescita-' + Date.now() + '.' + ext;
            a.click();
            setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        };
        recorder.onerror = function (e) { console.error('AudioEngine recorder error:', e); recording = false; };
        recorder.start();
        recording = true;
        return recorder;
    }
    function stopRecording() { if (recorder && recording) { recorder.stop(); recording = false; } }
    function isRecording() { return recording; }

    var API = {
        ensure: ensure,
        resumeContext: resumeContext,
        tone: tone,
        toneWithTimbre: toneWithTimbre,
        chord: chord,
        getAnalyser: getAnalyser,
        getContext: getContext,
        toggleMute: toggleMute,
        isMuted: isMuted,
        setVolume: setVolume,
        getVolume: getVolume,
        setPan: setPan,
        startRecording: startRecording,
        stopRecording: stopRecording,
        isRecording: isRecording,

        click: function () { resumeContext().then(function () { tone(880, 0.05, 'square', 0.15); }); },
        flip: function () { resumeContext().then(function () { tone(1200, 0.08, 'triangle', 0.18); }); },
        match: function () { resumeContext().then(function () { chord([1047, 1568, 2093], 0.2, 'sine', 0.2); }); },
        wrong: function () { resumeContext().then(function () { tone(150, 0.3, 'sawtooth', 0.2); }); },
        win: function () { resumeContext().then(function () { chord([523, 659, 784, 1047, 1319, 1568], 0.25, 'sine', 0.28); }); },
        correct: function () { resumeContext().then(function () { chord([1047, 1568], 0.15, 'sine', 0.22); }); },
        error: function () { resumeContext().then(function () { tone(120, 0.4, 'sawtooth', 0.25); }); },
        tick: function () { resumeContext().then(function () { tone(2000, 0.02, 'square', 0.12); }); },
        hint: function () { resumeContext().then(function () { chord([660, 880, 1320], 0.15, 'triangle', 0.18); }); },
        open: function () { resumeContext().then(function () { chord([440, 880], 0.15, 'sine', 0.18); }); },
        close: function () { resumeContext().then(function () { chord([880, 440], 0.15, 'sine', 0.15); }); },
        paint: (function () {
            var last = 0;
            return function () {
                var now = performance.now();
                if (now - last < 30) return;
                last = now;
                resumeContext().then(function () { tone(1600, 0.015, 'square', 0.07); });
            };
        })(),
        countdown: function () { resumeContext().then(function () { tone(440, 0.1, 'square', 0.18); }); },
        timeUp: function () { resumeContext().then(function () { chord([200, 180], 0.5, 'sawtooth', 0.25); }); },
        modeChange: function () { resumeContext().then(function () { chord([523, 784, 1047], 0.15, 'sine', 0.2); }); },
        hover: function () { resumeContext().then(function () { tone(660, 0.03, 'sine', 0.08); }); },
        roll: function () {
            resumeContext().then(function () {
                for (var i = 0; i < 8; i++) {
                    setTimeout(function () { tone(300 + Math.random() * 1200, 0.04, 'square', 0.12); }, i * 45);
                }
            });
        },
        diceResult: function () { resumeContext().then(function () { chord([1319, 1760, 2093], 0.15, 'sine', 0.28); }); },
        laser: function () { resumeContext().then(function () { var o = tone(1800, 0.15, 'sawtooth', 0.18); }); },
        boom: function () { resumeContext().then(function () { chord([80, 60], 0.5, 'sawtooth', 0.3); }); },
        jump: function () { resumeContext().then(function () { tone(600, 0.1, 'square', 0.15); }); }
    };

    global.AudioEngine = API;
})(window);
