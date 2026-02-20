export default async function errorHandler(err, req, res, next) {
  const status = err.status ?? err.statusCode ?? 500;
  const message = err.message ?? "Internal Server Error";
  const isOperational = err.isOperational;

  if (isOperational) {
    res.status(status).json({ message });
  } else {
    console.log("[CRITICAL ERROR]:", {
      message,
      stack: err.stack,
      path: req.path,
    });

    res.status(500).json({ message: "Internal Server Error" });
  }

  next();
}