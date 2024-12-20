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
  const [ecgData1, setEcgData1] = useState<number[]>([]); // State untuk data ECG1
  const [ecgData2, setEcgData2] = useState<number[]>([]); // State untuk data ECG2
  const [ecgData3, setEcgData3] = useState<number[]>([]); // State untuk data ECG3
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

        if (message.type === 'ecg1' && Array.isArray(message.data)) {
          // Update data ECG1
          setEcgData1((prevData) => {
            const newData = [...prevData, ...message.data];
            if (newData.length > 100) newData.splice(0, newData.length - 100);
            return newData;
          });

          // Peringatan jika ada nilai 0 pada ECG1
          if (message.data.includes(0)) {
            alert('Bertambah satu kematian di dunia ini (ECG1)');
          }
        } else if (message.type === 'ecg2' && Array.isArray(message.data)) {
          // Update data ECG2
          setEcgData2((prevData) => {
            const newData = [...prevData, ...message.data];
            if (newData.length > 100) newData.splice(0, newData.length - 100);
            return newData;
          });

          // Peringatan jika ada nilai 0 pada ECG2
          if (message.data.includes(0)) {
            alert('Bertambah satu kematian di dunia ini (ECG2)');
          }
        } else if (message.type === 'ecg3' && Array.isArray(message.data)) {
          // Update data ECG2
          setEcgData3((prevData) => {
            const newData = [...prevData, ...message.data];
            if (newData.length > 100) newData.splice(0, newData.length - 100);
            return newData;
          });

          // Peringatan jika ada nilai 0 pada ECG2
          if (message.data.includes(0)) {
            alert('Bertambah satu kematian di dunia ini (ECG2)');
          }
        } 
        else {
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

  const chartData1 = {
    labels: ecgData1.map((_, index) => index), // Indeks data sebagai label
    datasets: [
      {
        label: 'ECG Signal 1',
        data: ecgData1,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const chartData2 = {
    labels: ecgData2.map((_, index) => index), // Indeks data sebagai label
    datasets: [
      {
        label: 'ECG Signal 2',
        data: ecgData2,
        borderColor: 'rgba(192, 75, 75, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const chartData3 = {
    labels: ecgData3.map((_, index) => index), // Indeks data sebagai label
    datasets: [
      {
        label: 'ECG Signal 2',
        data: ecgData3,
        borderColor: 'rgba(192, 75, 75, 1)',
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
    <div style={{ width: '100%' }}>
      <h3>{connectionStatus}</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <h4>ECG 1</h4>
        <Line data={chartData1} options={options} />
      </div>
      <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
        <h4>ECG 2</h4>
        <Line data={chartData2} options={options} />
      </div>
      <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
        <h4>ECG 3</h4>
        <Line data={chartData3} options={options} />
      </div>
    </div>
  );
}
