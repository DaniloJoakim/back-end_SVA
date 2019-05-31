import Api from './api/api'

Api.listen(process.env.PORT || 3000, () => {
    console.log(`O servidor está rodando na porta ${process.env.PORT || 3000}`);
});
