import express from 'express'

const app = express()

app.get('/users', (req, res) => {
  res.json(['Diogo, Aline, Thiago, Marcela'])
})

app.listen(3333)