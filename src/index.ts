import express from 'express'
import http from 'http'
import WebSocket from 'ws'

const app = express()

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })
let offers: { ws: WebSocket, offer: RTCSessionDescription }[] = []

wss.on('connection', ws => {
  ws.on('message', message => {
    wss.clients.forEach(client => {
      if (client !== ws) {
        client.send(message)
      }
    })
  })

  ws.on('close', () => {
    offers = offers.filter(offer => offer.ws !== ws)
  })

  ws.send('Connected')
})


server.listen(3333, () => {
  console.log(`Server started`)
})