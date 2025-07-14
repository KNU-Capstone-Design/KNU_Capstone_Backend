import React, { useState, useEffect, useMemo } from 'react';
import { Box, H2, H4, Text, Loader } from '@adminjs/design-system';
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
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MAX_DATA_POINTS = 20; // 그래프에 표시할 최대 데이터 포인트 수

const ServerMonitorDashboard = () => {
    const [serverData, setServerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/server-resources', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 10000
            });
            const newData = {
                ...response.data,
                time: new Date().toLocaleTimeString()
            };
            setServerData(prevData => [...prevData, newData].slice(-MAX_DATA_POINTS));
            setError(null);
        } catch (error) {
            console.error('서버 데이터 불러오기 오류:', error);
            setError(`데이터 로드 실패: ${error.message || '알 수 없는 오류'}`);
        } finally {
            if (loading) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const chartData = useMemo(() => {
        const labels = serverData.map(d => d.time);
        return {
            labels,
            datasets: [
                {
                    label: 'CPU 사용량 (%)',
                    data: serverData.map(d => d.cpuUsage),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                },
                {
                    label: 'RAM 사용량 (%)',
                    data: serverData.map(d => d.memoryUsage),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y1',
                },
            ],
        };
    }, [serverData]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'CPU 사용량 (%)'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'RAM 사용량 (%)'
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    if (loading) {
        return (
            <Box>
                <Loader />
                <Text>데이터를 불러오는 중...</Text>
            </Box>
        );
    }

    if (error && serverData.length === 0) {
        return (
            <Box>
                <Text>{error}</Text>
            </Box>
        );
    }

    const latestData = serverData.length > 0 ? serverData[serverData.length - 1] : null;

    return (
        <Box>
            <H2>서버 모니터 대시보드</H2>
            {error && <Text color="red">{error}</Text>}
            <Box style={{ height: '300px', marginBottom: '20px' }}>
                <Line options={chartOptions} data={chartData} />
            </Box>

            {latestData && (
                <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                    <Box variant="card" width={['100%', '48%', '23%']} mb="lg">
                        <Text>플랫폼</Text>
                        <H4>{latestData.platform}</H4>
                    </Box>
                    <Box variant="card" width={['100%', '48%', '23%']} mb="lg">
                        <Text>서버 가동 시간</Text>
                        <H4>{latestData.uptime} 시간</H4>
                    </Box>
                    <Box variant="card" width={['100%', '48%', '23%']} mb="lg">
                        <Text>총 메모리</Text>
                        <H4>{latestData.memoryTotal} GB</H4>
                    </Box>
                    <Box variant="card" width={['100%', '48%', '23%']} mb="lg">
                        <Text>사용 가능 메모리</Text>
                        <H4>{latestData.memoryFree} GB</H4>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ServerMonitorDashboard;