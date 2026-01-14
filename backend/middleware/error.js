/**
 * 에러 처리 미들웨어
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // JWT 에러
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }

  // Validation 에러
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  // 기본 에러
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
