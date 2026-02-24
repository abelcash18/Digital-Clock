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
   let selectedTimezone = 'America/New_York';

   function updateClock() {
      const now = new Date();
      const timeOptions = { 
        timeZone: selectedTimezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      
      const dateOptions = { 
        timeZone: selectedTimezone,
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };

      const timeString = now.toLocaleString('en-US', timeOptions);
      const [h24, m, s] = timeString.split(':');
      const h = parseInt(h24);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = (h % 12 || 12).toString().padStart(2, '0');

      document.getElementById('time').innerHTML = `${h12}:${m}:${s}<span class="ampm">${ampm}</span>`;

      if (parseInt(s) !== lastSecond) {
         playTickSound();
         lastSecond = parseInt(s);
      }

      const dateString = now.toLocaleDateString('en-US', dateOptions);
      document.getElementById('date').textContent = dateString;

      const dayString = now.toLocaleDateString('en-US', { 
        timeZone: selectedTimezone,
        weekday: 'long' 
      });
      document.getElementById('day').textContent = dayString;
    }

    document.getElementById('continentSelect').addEventListener('change', function(e) {
      selectedTimezone = e.target.value;
      updateClock();
    });

    updateClock();
    setInterval(updateClock, 1000);
 