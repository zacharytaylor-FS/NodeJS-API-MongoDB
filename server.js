const http = require('http');
require('dotenv-vault-core').config();
const app = require('./app/app')

http.createServer(app).listen(process.env.PORT || 3000, () => console.log(`Server is listening on port: ${process.env.PORT}`));