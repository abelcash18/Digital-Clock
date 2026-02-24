   function playTickSound() {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
   }

   let lastSecond = -1;

   function updateClock() {
      const now = new Date();

      let h = now.getHours();
      let m = now.getMinutes();
      let s = now.getSeconds();
      const ampm = h >= 12 ? 'PM' : 'AM';

      h = h % 12 || 12;
      h = String(h).padStart(2, '0');
      m = String(m).padStart(2, '0');
      s = String(s).padStart(2, '0');

      document.getElementById('time').innerHTML = `${h}:${m}:${s}<span class="ampm">${ampm}</span>`;

      if (now.getSeconds() !== lastSecond) {
         playTickSound();
         lastSecond = now.getSeconds();
      }

      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);

      document.getElementById('day').textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
    }

    updateClock();
    setInterval(updateClock, 1000);
 