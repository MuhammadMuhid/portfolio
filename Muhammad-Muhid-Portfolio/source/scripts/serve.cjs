const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist');
const port = Number(process.env.PORT || 5173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml','.pdf':'application/pdf','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res) => {
 try {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404);res.end('Not found');return; }
  res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-cache'});
  fs.createReadStream(file).pipe(res);
 } catch { res.writeHead(400);res.end('Bad request'); }
}).listen(port,'0.0.0.0',() => console.log(`Portfolio: http://localhost:${port}`));
