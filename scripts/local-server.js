
const { join } = require('path')
const express = require('express')
const compression = require('compression')

const app = express()
app.use(compression())
app.use(express.static(join(__dirname, '..', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'dist', 'index.html'))
  res.end()
})

app.listen(3000, () => { console.log('Listering on http://localhost:3000') })
