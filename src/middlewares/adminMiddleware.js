// AdminJS를 위한 CSP 설정 미들웨어
export const setupCSP = (app) => {
  app.use((req, res, next) => {
    if (req.path.startsWith('/admin')) {
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " + 
        "font-src 'self' data: https://fonts.gstatic.com; " + 
        "img-src 'self' data:; " +
        "connect-src 'self';"
      );
    }
    next();
  });
};