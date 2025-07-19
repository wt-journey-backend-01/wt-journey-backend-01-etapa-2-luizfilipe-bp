function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    res.status(status).json({
        status: status,
        mensagem: err.message || 'Erro interno do servidor, tente novamente mais tarde.',
        errors: err.errors || null,
    });
}

module.exports = errorHandler;
