function errorHandler(err, req, res, next) {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor';
    const errors = err.errors || {};
    return res.status(status).json({
        status,
        message,
        errors,
    });
}

module.exports = errorHandler;
