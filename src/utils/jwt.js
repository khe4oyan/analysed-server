// libs
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

export function createToken(payload) {
  const token = jwt.sign(payload, secretKey);
  return token;
}

export function parseToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;    
  }
}