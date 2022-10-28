const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipe = require('./Recipe')
const Diet = require('./Diet')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipe', Recipe)
router.use('/diet', Diet)


module.exports = router;
