import { createProxyMiddleware } from 'http-proxy-middleware';

/*
Esse tipo de middleware transforma a api gateway mais genérica, mas você perde um pouco o controle de como vai validar
*/
export const userProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/users',
  },
});
