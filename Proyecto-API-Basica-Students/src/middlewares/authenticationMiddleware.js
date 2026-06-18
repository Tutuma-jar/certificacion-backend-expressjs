import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    const error = Error("Token required");
    error.statusCode = 401;
    return next(error);
  }

  const token = authorization.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = payload; // Save the payload token in req.user
    console.log(payload);
    next();
  } catch (catchedError) {
    const error = Error("Invalid or expired token");
    error.statusCode = 401;
    return next(error);
  }
}