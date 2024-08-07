const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  jwt_verify: (req) => {
    return new Promise((resolve, reject) => {
      try {
        const bearer = req.headers['authorization'];
        if (typeof bearer !== 'undefined') {
          const token = bearer.split(' ');
          const final_token = token[1];
          
          jwt.verify(final_token, process.env.JWT_SECRET_KEY, async (err, decode) => {
            if (err) {
              // Handle JWT verification errors (e.g., token expired, invalid signature)
              return reject(new Error('Invalid or expired token'));
            }
            
            try {
              let email = decode.data.Email;
              const user = await User.findOne({ Email: email });
              
              if (user) {
                return resolve(user);
              } else {
                // User not found
                return reject(new Error('User not found'));
              }
            } catch (dbError) {
              // Handle errors during database query
              return reject(new Error('Database query error: ' + dbError.message));
            }
          });
        } else {
          // Authorization header is missing or malformed
          return reject(new Error('Authorization header is missing or malformed'));
        }
      } catch (error) {
        // Handle unexpected errors
        return reject(new Error('Unexpected error: ' + error.message));
      }
    });
  }
};
