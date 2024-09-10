"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,  // Register the CategoryScale for 'category' axis
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  ChartCanvas,
  Chart,
  CandlestickSeries,
  XAxis,
  YAxis,
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-financial-charts';
import { scaleTime } from 'd3-scale';  // Import D3's scaleTime function
import zoomPlugin from 'chartjs-plugin-zoom'; // Import the zoom plugin

// Register Chart.js components including CategoryScale for 'category' axis and zoom plugin
ChartJS.register(
  CategoryScale,  // Add this line to register the category scale
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  zoomPlugin // Register zoom plugin for zoom and pan
);

interface CandlestickDataType {
  x: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ChartDataType {
  labels: string[];
  datasets: { label: string; data: number[] | CandlestickDataType[]; [key: string]: any }[];
}

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState<ChartDataType | null>(null);
  const [barChartData, setBarChartData] = useState<ChartDataType | null>(null);
  const [pieChartData, setPieChartData] = useState<ChartDataType | null>(null);
  const [candlestickData, setCandlestickData] = useState<CandlestickDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lineRes = await axios.get('http://localhost:8000/api/line-chart-data/');
        setLineChartData({
          labels: lineRes.data.labels,
          datasets: [
            {
              label: 'Line Chart',
              data: lineRes.data.data,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        });

        const barRes = await axios.get('http://localhost:8000/api/bar-chart-data/');
        setBarChartData({
          labels: barRes.data.labels,
          datasets: [
            {
              label: 'Bar Chart',
              data: barRes.data.data,
              backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
          ],
        });

        const pieRes = await axios.get('http://localhost:8000/api/pie-chart-data/');
        setPieChartData({
          labels: pieRes.data.labels,
          datasets: [
            {
              label: 'Pie Chart',
              data: pieRes.data.data,
              backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
          ],
        });

        // Fetch Candlestick Data
        const candlestickRes = await axios.get('http://localhost:8000/api/candlestick-data/');
        setCandlestickData(candlestickRes.data.data.map((item: any) => ({
          x: new Date(item.x),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        })));
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Line Chart</h2>
          {lineChartData && <Line data={lineChartData} />}
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Bar Chart</h2>
          {barChartData && <Bar data={barChartData} />}
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Pie Chart</h2>
          {pieChartData && <Pie data={pieChartData} />}
        </div>

        {/* Candlestick Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Candlestick Chart</h2>
          {candlestickData.length > 0 && (
            <ChartCanvas
              width={600}
              height={400}
              ratio={1}
              seriesName="Candlestick Series"
              data={candlestickData}
              xAccessor={(d: any) => d.x}
              xScale={scaleTime()}  // Use scaleTime from D3 for the x-axis
              xExtents={[candlestickData[0].x, candlestickData[candlestickData.length - 1].x]}
              margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
            >
              <Chart id={1} yExtents={(d: any) => [d.high, d.low]}>
                <XAxis axisAt="bottom" orient="bottom" ticks={6} tickPadding={5} />
                <YAxis axisAt="left" orient="left" ticks={5} tickPadding={5} />

                {/* Candlestick series with color styling */}
                <CandlestickSeries
                  wickStroke={(d: any) => (d.close > d.open ? '#26A69A' : '#EF5350')}
                  fill={(d: any) => (d.close > d.open ? '#26A69A' : '#EF5350')}
                  stroke={(d: any) => (d.close > d.open ? '#26A69A' : '#EF5350')}
                />

                {/* Mouse Coordinates */}
                <MouseCoordinateX displayFormat={(date: Date) => date.toLocaleDateString()} />
                <MouseCoordinateY displayFormat={(value: number) => value.toFixed(2)} />
              </Chart>
              <CrossHairCursor />
            </ChartCanvas>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
