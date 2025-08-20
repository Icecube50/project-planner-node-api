import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  // Tokens are usually sent as "Authorization: Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Attach user payload to request so routes can use it
    req.user = user;
    next(); // ✅ move to the next middleware/route handler
  });
}
