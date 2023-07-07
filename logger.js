function logger(req, res, next) {
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url} ${req.query}`);
    next();
}
module.exports = logger;