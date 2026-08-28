const ErrorHandler = require("./ErrorHandler");

// ponytail: single-process in-memory window — fine for one instance, swap for
// a shared store (e.g. Redis) if the API ever runs behind multiple instances
const buckets = new Map();

const rateLimiter = ({ windowMs, max, keyFn, message }) => (req, res, next) => {
  const key = keyFn(req);
  if (!key) return next();

  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return next();
  }

  if (bucket.count >= max) {
    return next(
      new ErrorHandler(message || "Too many requests. Please try again later.", 429)
    );
  }

  bucket.count += 1;
  next();
};

module.exports = rateLimiter;
