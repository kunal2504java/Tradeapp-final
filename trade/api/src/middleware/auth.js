import jwt from 'jsonwebtoken';

function getJwtSecret() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set in the environment variables.');
  }
  return jwtSecret;
}

/**
 * Creates a new JSON Web Token.
 * The payload should contain the user's ID and role.
 * @param {object} payload - The payload to sign, e.g., { id: userId, role: userRole }.
 * @returns {string} The generated JWT.
 */
export function signJwt(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

/**
 * Middleware to protect routes that require authentication.
 * It verifies the JWT from the Authorization header and attaches the
 * decoded token payload (including user id and role) to req.user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.slice('Bearer '.length);
  try {
    // Verify the token and get the decoded payload
    const payload = jwt.verify(token, getJwtSecret());

    // Attach the entire payload (which includes id and role) to req.user
    req.user = payload;
    
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

/**
 * Middleware to protect routes that are for admins only.
 * This MUST be used *after* the requireAuth middleware.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
}

