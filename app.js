/* Entry Point */

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const port = 3000;

// Swagger 문서 연결
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 기본 라우트
/**
 * @swagger
 * /:
 *   get:
 *     summary: 기본 경로 응답
 *     description: 루트 경로('/')의 응답을 반환합니다.
 *     responses:
 *       200:
 *         description: 성공적으로 응답 반환
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 서버 실행
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});