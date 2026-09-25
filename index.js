const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'TrolardyCraft.aternos.me', // Cambia por la IP de tu Aternos
    port: 20431,                   // Cambia el puerto si Aternos te da uno dinámico
    username: 'aternos'        // Nombre del bot dentro del juego
  });

  bot.on('spawn', () => {
    console.log('Bot conectado con éxito al servidor.');
    // Movimiento ligero para evitar kick por AFK interno del servidor
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

  // Si se desconecta o Aternos se reinicia, reintenta en 15 segundos
  bot.on('end', () => {
    console.log('Desconectado. Reintentando en 15 segundos...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Error del bot:', err);
    setTimeout(createBot, 15000);
  });
}

createBot();
