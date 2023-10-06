const express = require('express');
const cors = require('cors');
const { route } = require('./router/router.js');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '1000mb' }));
app.use(cors({ origin: '*' }))
app.use(route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
})