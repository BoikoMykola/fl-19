import jwt from 'jsonwebtoken';

export function generateToken(email, callback) {
  jwt.sign({ email }, 'password', callback);
}

export function generateTokenPromise(email) {
  return new Promise((resolve, reject) => {
    jwt.sign({ email }, 'password', (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}


