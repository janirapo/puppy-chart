// middleware function that disables caching
export const noCacheHeaders = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};

// middleware function that sets content type to json
export const jsonHeader = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};
