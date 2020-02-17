const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV === 'development'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  
  // Let next handle the rest.
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(8080, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:8080')
  })
})