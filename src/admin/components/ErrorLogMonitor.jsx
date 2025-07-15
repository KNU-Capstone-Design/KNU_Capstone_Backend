import React, { useState, useEffect } from 'react';

const ErrorLogMonitor = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 10000); // 10초마다 새로고침
        return () => clearInterval(interval);
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await fetch('/api/logs/error');
            if (!response.ok) {
                throw new Error('로그를 불러올 수 없습니다');
            }
            const logData = await response.text();
            const parsedLogs = parseLogData(logData);
            setLogs(parsedLogs);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const parseLogData = (data) => {
        const lines = data.split('\n').filter(line => line.trim());
        const logs = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const match = line.match(/^\[(.+?)\] \[(.+?)\] \[(.+?)\]: (.+)/);

            if (match) {
                const [, timestamp, level, service, message] = match;
                let jsonData = null;

                // 다음 줄부터 JSON 데이터를 찾아서 파싱
                if (i + 1 < lines.length && lines[i + 1].trim().startsWith('{')) {
                    let jsonLines = [];
                    let braceCount = 0;
                    let jsonStartIndex = i + 1;

                    // JSON 블록의 끝을 찾기 위해 중괄호 개수를 세기
                    for (let j = jsonStartIndex; j < lines.length; j++) {
                        const jsonLine = lines[j].trim();
                        jsonLines.push(jsonLine);

                        for (let char of jsonLine) {
                            if (char === '{') braceCount++;
                            if (char === '}') braceCount--;
                        }

                        // 중괄호가 닫히면 JSON 블록 완료
                        if (braceCount === 0) {
                            try {
                                const jsonString = jsonLines.join('');
                                jsonData = JSON.parse(jsonString);
                                console.log('Parsed JSON data:', jsonData); // 디버깅용
                                i = j; // JSON 블록 끝으로 인덱스 이동
                                break;
                            } catch (e) {
                                console.error('JSON parse error:', e, 'JSON string:', jsonLines.join('')); // 디버깅용
                                i = j; // 에러가 발생해도 인덱스는 이동
                                break;
                            }
                        }
                    }
                }

                logs.push({
                    timestamp,
                    level,
                    service,
                    message,
                    data: jsonData
                });
            }
        }

        return logs.reverse(); // 최신 로그가 위에 오도록
    };

    const filteredLogs = logs.filter(log =>
        log.message.toLowerCase().includes(filter.toLowerCase()) ||
        log.service.toLowerCase().includes(filter.toLowerCase()) ||
        (log.data?.userId && log.data.userId.toLowerCase().includes(filter.toLowerCase())) ||
        (log.data?.email && log.data.email.toLowerCase().includes(filter.toLowerCase()))
    );

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('ko-KR');
    };

    const getLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case 'error': return '#ff4d4f';
            case 'warn': return '#faad14';
            case 'info': return '#1890ff';
            default: return '#666';
        }
    };

    const getUserInfo = (data) => {
        if (!data) return null;
        if (data.email) return `email: "${data.email}"`;
        if (data.userId) return `userId: "${data.userId}"`;
        return null;
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px',
                fontSize: '16px'
            }}>
                로그를 불러오는 중...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                padding: '20px',
                color: '#ff4d4f',
                textAlign: 'center',
                backgroundColor: '#fff2f0',
                border: '1px solid #ffccc7',
                borderRadius: '6px'
            }}>
                오류: {error}
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h1 style={{
                    margin: 0,
                    color: '#ff4d4f',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>
                    📋 Error Log Monitor
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="메시지 또는 서비스명으로 검색..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #d9d9d9',
                            borderRadius: '6px',
                            width: '300px'
                        }}
                    />
                    <button
                        onClick={fetchLogs}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#1890ff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        새로고침
                    </button>
                </div>
            </div>

            <div style={{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '10px'
            }}>
                <strong>총 {filteredLogs.length}개의 로그</strong>
                {filter && <span> ('{filter}' 검색 결과)</span>}
                <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                    ⚠️ 에러 | 🔐 인증 실패 | 📧 메일 오류 | 🌐 네트워크 오류 | 🔑 토큰 문제
                </div>
            </div>

            <div style={{
                maxHeight: '70vh',
                overflowY: 'auto',
                border: '1px solid #e8e8e8',
                borderRadius: '8px'
            }}>
                {filteredLogs.length === 0 ? (
                    <div style={{
                        padding: '40px',
                        textAlign: 'center',
                        color: '#999'
                    }}>
                        {filter ? '검색 결과가 없습니다.' : '로그가 없습니다.'}
                    </div>
                ) : (
                    filteredLogs.map((log, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '15px',
                                borderBottom: '1px solid #f0f0f0',
                                backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '8px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{
                                        backgroundColor: getLevelColor(log.level),
                                        color: 'white',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        {log.level.toUpperCase()}
                                    </span>
                                    <span style={{
                                        backgroundColor: '#e6f7ff',
                                        color: '#1890ff',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px'
                                    }}>
                                        {log.service}
                                    </span>
                                    {getUserInfo(log.data) && (
                                        <span style={{
                                            backgroundColor: '#f6ffed',
                                            color: '#52c41a',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}>
                                            {getUserInfo(log.data)}
                                        </span>
                                    )}
                                </div>
                                <span style={{
                                    color: '#666',
                                    fontSize: '14px',
                                    fontFamily: 'monospace'
                                }}>
                                    {formatTimestamp(log.timestamp)}
                                </span>
                            </div>

                            <div style={{
                                marginBottom: '10px',
                                fontSize: '14px',
                                lineHeight: '1.5',
                                color: '#333'
                            }}>
                                {log.message}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ErrorLogMonitor;
