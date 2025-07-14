import os from 'os';

// CPU 사용량을 계산하는 함수 (1초 간격)
function getCpuUsage() {
  return new Promise((resolve) => {
    const start = os.cpus().map(c => ({ ...c, total: c.times.user + c.times.nice + c.times.sys + c.times.idle + c.times.irq }));
    setTimeout(() => {
      const end = os.cpus().map(c => ({ ...c, total: c.times.user + c.times.nice + c.times.sys + c.times.idle + c.times.irq }));
      const idle = end.reduce((a, c, i) => a + c.times.idle - start[i].times.idle, 0);
      const total = end.reduce((a, c, i) => a + c.total - start[i].total, 0);
      if (total === 0) {
        resolve(0); // 활동이 없을 경우 0을 반환
        return;
      }
      resolve(100 * (1 - idle / total));
    }, 1000);
  });
}

export const getServerInfo = async () => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const memUsage = ((totalMem - freeMem) / totalMem) * 100;
  const cpuUsage = await getCpuUsage();

  return {
    cpuUsage: cpuUsage.toFixed(2),
    memoryTotal: (totalMem / (1024 ** 3)).toFixed(2), // GB
    memoryFree: (freeMem / (1024 ** 3)).toFixed(2), // GB
    memoryUsage: memUsage.toFixed(2),
    uptime: (os.uptime() / 3600).toFixed(2), // 시간
    platform: os.platform(),
  };
};

