const express = require('express')
const filUpload = require('express-fileupload')
const cors = require('cors')
const app = express()
const fs = require('fs')
const PORT = process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json());
app.use(filUpload());

//api endpoints
app.get('/', (req, res) => {
    res.status(200).send("Hola")
})

app.post('/processimage', (req, res) => {
    const image = req.files.media
    console.log(image)
    fs.writeFileSync(`../input/${image.name}`, image.data, function (err) {
        if (err) {
            return console.log(err);
        }
    });
    res.status(201).send("Image updated successfully")
})

//listener
app.listen(PORT, () => console.log(`Server running at ${PORT}`))