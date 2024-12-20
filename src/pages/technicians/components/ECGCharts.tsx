import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ECGChart() {
  const [ecgData, setEcgData] = useState<number[]>([]); // State untuk data ECG
  const [connectionStatus, setConnectionStatus] = useState('Connecting...'); // Status koneksi WebSocket

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:6969'); // WebSocket server di port 6969

    socket.onopen = () => {
      console.log('WebSocket connected');
      setConnectionStatus('Connected');
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data); // Parsing pesan JSON
        console.log('Message received:', message);

        if (message.type === 'ecg' && Array.isArray(message.data)) {
            console.log('apaaja')
          // Periksa jika ada data ECG dengan nilai 0
          if (message.data.includes(0)) {
            alert('Orangnya almarhum'); // Tampilkan alert jika ada nilai 0
          }

          // Update data ECG dan pastikan hanya 100 data terakhir yang disimpan
          setEcgData((prevData) => {
            const newData = [...prevData, ...message.data];
            if (newData.length > 100) newData.splice(0, newData.length - 100); // Batasi data agar tidak terlalu panjang
            return newData;
          });
        } else {
          console.error('Invalid ECG message format:', message);
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    socket.onclose = (event) => {
      console.warn('WebSocket closed', event);
      setConnectionStatus('Disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error');
    };

    return () => {
      socket.close(); // Close WebSocket when component unmounts
    };
  }, []);

  const chartData = {
    labels: ecgData.map((_, index) => index), // Waktu atau indeks data
    datasets: [
      {
        label: 'ECG Signal',
        data: ecgData,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'ECG Signal',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h3>{connectionStatus}</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}
