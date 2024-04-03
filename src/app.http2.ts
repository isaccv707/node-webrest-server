import http2 from 'http2'
import fs from 'fs'


interface serverOption{
    key:string
    cert:string
}

const serverConfig: serverOption = {
    key: './keys/server.key',
    cert: './keys/server.crt'
}

//creando el servidor
const server = http2.createSecureServer(
  {
    key: fs.readFileSync(serverConfig.key),
    cert: fs.readFileSync(serverConfig.cert)
  },
  (req, res) => {
    console.log(req.url)
    if (req.url === '/') {
      const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(htmlFile)
      return
    }
    if (req.url?.endsWith('js')) {
      res.writeHead(200, { 'Content-Type': 'application/javascript' })
    } else if (req.url?.endsWith('css')) {
      res.writeHead(200, { 'Content-Type': 'text/css' })
    }
    try {
      const responseContent = fs.readFileSync(`./public${req.url}`)
      res.end(responseContent)
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end();
    }
  }
)

// console.log(server);

server.listen(8080, () => {
  console.log('server runing on port 8080')
})
