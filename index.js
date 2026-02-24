   function updateClock() {
      const now = new Date();

      // Time
      let h = now.getHours();
      let m = now.getMinutes();
      let s = now.getSeconds();
      const ampm = h >= 12 ? 'PM' : 'AM';

      // 12-hour format
      h = h % 12 || 12;

      // Leading zeros
      h = String(h).padStart(2, '0');
      m = String(m).padStart(2, '0');
      s = String(s).padStart(2, '0');

      document.getElementById('time').innerHTML = `${h}:${m}:${s}<span class="ampm">${ampm}</span>`;

      // Date
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);

      // Just weekday (optional separate line)
      document.getElementById('day').textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
    }

    // Run immediately + every second
    updateClock();
    setInterval(updateClock, 1000);
 