const WebSocket = require('ws');
const http = require('http');

// Membuat server HTTP
const server = http.createServer();

// Membuat WebSocket server
const wss = new WebSocket.Server({ server });

// Variabel untuk menyimpan data dari tiga sumber ECG
let dataECG1 = 'No data for ECG1';
let dataECG2 = 'No data for ECG2';
let dataECG3 = 'No data for ECG3';

// Menangani koneksi WebSocket
wss.on('connection', (ws) => {
  console.log('A client connected');

  // Kirim data ECG ke client setiap 500 ms
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ type: 'ecg1', data: dataECG1 }));
    ws.send(JSON.stringify({ type: 'ecg2', data: dataECG2 }));
    ws.send(JSON.stringify({ type: 'ecg3', data: dataECG3 }));
  }, 500);

  // Menangani pesan dari client
  ws.on('message', (message) => {
    try {
      // Parsing pesan JSON dari client
      const parsedMessage = JSON.parse(message.toString('utf-8'));

      if (parsedMessage.type === 'ecg1') {
        dataECG1 = parsedMessage.data || 'No data for ECG1';
      } else if (parsedMessage.type === 'ecg2') {
        dataECG2 = parsedMessage.data || 'No data for ECG2';
      } else if (parsedMessage.type === 'ecg3') {
        dataECG3 = parsedMessage.data || 'No data for ECG3';
      } else {
        console.log('Unknown message type:', parsedMessage.type);
      }

      console.log(`Received ${parsedMessage.type}:`, parsedMessage.data);
    } catch (err) {
      console.error('Failed to parse message:', err);
    }
  });

  // Menangani penutupan koneksi
  ws.on('close', () => {
    clearInterval(interval); // Hentikan pengiriman data
    console.log('A client disconnected');
  });

  // Menangani error
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

// Menjalankan server di port 6969
server.listen(6969, () => {
  console.log('WebSocket server running at ws://localhost:6969');
});
