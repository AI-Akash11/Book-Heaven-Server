const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('book heaven server is running')
})

app.listen(port, () => {
  console.log(`book heaven server listening on port ${port}`)
})
