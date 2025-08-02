import React, { useState, useEffect } from 'react';
import { Box, H2, H4, Text, Loader, MessageBox } from '@adminjs/design-system';
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
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MAX_DATA_POINTS = 10; // 그래프에 표시할 최대 데이터 포인트 수

const ApiUsageMonitor = () => {
  const [apiData, setApiData] = useState([]);
  const [smtpData, setSmtpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 오류 메시지 로깅 함수
  const logErrorToConsole = (message, error) => {
    console.error(`[ApiUsageMonitor] ${message}:`, error);
  };

  // API를 통해 데이터 가져오기
  const fetchData = async () => {
    setLoading(true);
    setError(null); // 이전 오류 초기화

    try {
      // API 사용량 데이터 가져오기 - getDailyApiUsageAggregation() 함수 사용
      const apiUsageResponse = await axios.get('/api/server-resources/api-usage');

      // SMTP 사용량 데이터 가져오기
      const smtpUsageResponse = await axios.get('/api/server-resources/smtp-usage');

      // 데이터 설정
      setApiData(apiUsageResponse.data);
      setSmtpData(smtpUsageResponse.data);
    } catch (err) {
      // 오류 로깅 및 상태 업데이트
      logErrorToConsole('데이터 가져오기 실패', err);
      if (err.response) {
        // 서버 응답 오류
        setError(`서버 오류: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        // 요청은 보냈지만 응답을 받지 못함
        setError('서버에 연결할 수 없습니다. 네트워크 연결을 확인하세요.');
      } else {
        // 기타 오류
        setError(`오류 발생: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
    };
  }, []);

  // 최근 데이터 필터링
  const recentApiData = apiData.slice(-MAX_DATA_POINTS);
  const recentSmtpData = smtpData.slice(-MAX_DATA_POINTS);

  // API 사용량 차트 설정
  const apiChartData = {
    labels: recentApiData.map(item => item.date),
    datasets: [
      {
        label: 'API 호출 횟수',
        data: recentApiData.map(item => item.totalCount),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // SMTP 사용량 차트 설정
  const smtpChartData = {
    labels: recentSmtpData.map(item => item.date),
    datasets: [
      {
        label: '환영 이메일',
        data: recentSmtpData.map(item => item.welcomeEmailCount),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: '질문 이메일',
        data: recentSmtpData.map(item => item.questionEmailCount),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  if (loading) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <MessageBox variant="danger">
          <H4>데이터 로딩 오류</H4>
          <Text>{error}</Text>
          <Box mt="lg">
            <button
              onClick={fetchData}
              style={{ padding: '8px 12px', cursor: 'pointer' }}
            >
              다시 시도
            </button>
          </Box>
        </MessageBox>
      </Box>
    );
  }

  return (
    <Box>
      <H2>API 사용량 모니터링</H2>

      {/* API 사용량 그래프 */}
      <Box style={{ marginBottom: '40px' }}>
        <H4>일일 API 사용량</H4>
        <Box style={{ height: '300px' }}>
          {recentApiData.length > 0 ? (
            <Line data={apiChartData} options={chartOptions} />
          ) : (
            <MessageBox variant="info">표시할 API 사용량 데이터가 없습니다.</MessageBox>
          )}
        </Box>
      </Box>

      {/* SMTP 사용량 그래프 */}
      <Box>
        <H4>일일 SMTP 사용량</H4>
        <Box style={{ height: '300px' }}>
          {recentSmtpData.length > 0 ? (
            <Line data={smtpChartData} options={chartOptions} />
          ) : (
            <MessageBox variant="info">표시할 SMTP 사용량 데이터가 없습니다.</MessageBox>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ApiUsageMonitor;
