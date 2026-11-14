import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const root = path.dirname(fileURLToPath(import.meta.url));
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ttf': 'font/ttf', '.ico': 'image/x-icon'
};
const server = http.createServer(async (request, response) => {
  try {
    const route = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + route);
    if (!file.startsWith(root + path.sep) && file !== root) throw Error('Invalid path');
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const data = await fs.readFile(file);
    response.writeHead(200, {'Content-Type': mime[path.extname(file)] || 'application/octet-stream'});
    response.end(data);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
server.listen(0, '127.0.0.1', () => {
  const url = 'http://127.0.0.1:' + server.address().port + '/';
  console.log(url);
  if (!process.argv.includes('--no-browser')) {
    spawn('rundll32.exe', ['url.dll,FileProtocolHandler', url], {windowsHide:true, stdio:'ignore'}).unref();
    console.log('Keep this window open while viewing the site.');
  }
});
