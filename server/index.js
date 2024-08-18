const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss()
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.ws('/', (ws, req) => {
    console.log('Подключение установлено');
    ws.send(JSON.stringify('Ты успешно подключился'));
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break
            case 'draw':
                broadcastConnection(ws, msg)
        }
    })
})

app.post('/image', (req, res) => {
    try {
            const data = req.body.img.replace('data:image/png;base64,', '')
        fs.writeFileSync(path.join(__dirname, 'files', `${req.query.id}.jpg`), data, "base64");
        return res.status(200).json({message: 'Изображение загружено'})
    } catch (e) {
        console.log(e)
        res.status(500).json('Error')
    }
})
app.get('/image', (req, res) => {
    try {
        const file = fs.readFileSync(path.join(__dirname, 'files', `${req.query.id}.jpg`))
        const data = 'data:image/png;base64,' + file.toString('base64');
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json('Error')
    }
})

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)})

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach((client) => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    })
}