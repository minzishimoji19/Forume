import http from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ ok: true, path: req.url }));
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
