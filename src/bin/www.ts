import app from '../app'
import http from 'http'
import dotenv from "dotenv"
import { normalizePort } from '../lib/normalization'

const config = dotenv.config();
if (config.error) {
  throw config.error;
}

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  if (typeof port !== 'number') return false
  console.log(`server listening on port ${port}`)
})
server.on('error', (e: unknown) => {
  console.log(e)
  process.exit(1)
})
// server.on('listening', (e: unknown) => {
//   console.log(e)
//   process.exit(1)
// })
