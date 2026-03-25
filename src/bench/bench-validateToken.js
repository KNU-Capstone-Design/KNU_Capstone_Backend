import autocannon from 'autocannon';

/**
 * validateToken 성능 측정용 벤치마크.
 *
 * 대상 엔드포인트: GET /api/users
 * 인증 방식: Cookie("token")
 *
 * autocannon을 활용한 지표 측정을 통해 redis에 저장된 토큰:email이 어느 정도의 성능 향상을 얻는지 검증
 *
 * 실행:
 *  npm run bench:token -- --url http://localhost:3000 --token <TOKEN>
 */

function getArg(name, defaultValue = undefined) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return defaultValue;
  const value = process.argv[idx + 1];
  if (!value || value.startsWith('--')) return defaultValue;
  return value;
}

const baseUrl = getArg('url', 'http://localhost:3000');
const token = getArg('token', process.env.BENCH_TOKEN);
const duration = Number(getArg('duration', process.env.BENCH_DURATION ?? 20));
const connections = Number(getArg('connections', process.env.BENCH_CONNECTIONS ?? 50));
const pipelining = Number(getArg('pipelining', process.env.BENCH_PIPELINING ?? 1));

if (!token) {
  console.error('토큰 필요함');
  process.exit(1);
}

const url = new URL('/api/users', baseUrl).toString();

const instance = autocannon(
  {
    url,
    method: 'GET',
    duration,
    connections,
    pipelining,
    headers: {
      Cookie: `token=${token}`,
      Accept: 'application/json'
    }
  },
  (err, result) => {
    if (err) {
      console.error('[bench] failed', err);
      process.exitCode = 1;
      return;
    }

    // 사람이 보기 좋게 요약
    const summary = {
      url,
      duration,
      connections,
      pipelining,
      requestsPerSec: result.requests.average,
      latencyMs: {
        average: result.latency.average,
        p50: result.latency.p50,
        p90: result.latency.p90,
        p95: result.latency.p95,
        p99: result.latency.p99
      },
      throughputBytesPerSec: result.throughput.average,
      non2xx: result.non2xx,
      errors: result.errors,
      timeouts: result.timeouts,
      statusCodeStats: result.statusCodeStats
    };

    console.log(JSON.stringify(summary, null, 2));
  }
);

// 진행상황 표시
autocannon.track(instance, {
  renderProgressBar: true,
  renderLatencyTable: true
});
