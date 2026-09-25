const mineflayer = require('mineflayer');

let reconnecting = false;

function createBot() {
  reconnecting = false;

  const bot = mineflayer.createBot({
    host: 'TrolardyCraft.aternos.me',
    port: 20431,
    username: 'aternos',
    version: '1.20.1', // Cambia esta versión por la versión EXACTA de tu Aternos (ej. 1.20.1, 1.20.4, 1.21, etc.)
    checkTimeoutInterval: 60000
  });

  bot.on('spawn', () => {
    console.log('Bot conectado con éxito al servidor.');
    
    // Salto ligero para evitar el AFK kick
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

  // Función para manejar la reconexión de forma segura
  function handleReconnect(reason) {
    if (!reconnecting) {
      reconnecting = true;
      console.log(`[${reason}] Reintentando conexión en 20 segundos...`);
      setTimeout(createBot, 20000);
    }
  }

  bot.on('end', () => handleReconnect('Desconectado'));
  bot.on('error', (err) => handleReconnect(`Error: ${err.message}`));
}

createBot();
