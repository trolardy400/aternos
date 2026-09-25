const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Satisface la verificación de puerto de Render
app.get('/', (req, res) => {
  res.send('Bot de Aternos activo.');
});

app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

// --- CÓDIGO DE MINEFLAYER A CONTINUACIÓN ---
const mineflayer = require('mineflayer');
let reconnecting = false;

function createBot() {
  reconnecting = false;

  const bot = mineflayer.createBot({
    host: 'TrolardyCraft.aternos.me',
    port: 20431,
    username: 'aternos',
    version: '1.20.1' // Ajusta según la versión exacta de tu servidor
  });

  bot.on('spawn', () => {
    console.log('Bot conectado con éxito al servidor.');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

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
