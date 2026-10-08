/**
 * Centralized Express error-handling middleware.
 *
 * Must be registered AFTER all routes so Express routes errors here
 * via next(err) or via Express 5's automatic async error forwarding.
 *
 * Always returns JSON — never the default Express HTML error page.
 */
const errorHandler = (err, req, res, next) => {
  // Log the full error server-side for debugging, but never expose
  // stack traces to the client.
  console.error(`[Error] ${err.name}: ${err.message}`);

  // Mongoose CastError means the route received a malformed MongoDB ObjectId
  // (e.g. /api/applications/abc). That is a client mistake → 400 Bad Request.
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid resource ID",
    });
  }

  // Mongoose ValidationError means a required field is missing or an enum
  // value is not allowed → 400 Bad Request with the Mongoose message.
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Everything else is unexpected — return a generic 500 so internal
  // details are never leaked to the client.
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
