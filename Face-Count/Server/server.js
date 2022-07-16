const express = require('express')
const filUpload = require('express-fileupload')
const cors = require('cors')
const app = express()
const fs = require('fs')
const { exec } = require('child_process')
const PORT = process.env.PORT || 3001

//middleware
app.use(cors())
app.use(express.json());
app.use(filUpload());

//api endpoints
app.get('/', (req, res) => {
    res.status(200).send("Hola")
})

app.post('/processimage', (req, res) => {
    const image = req.files.classimage
    console.log(image)
    fs.writeFileSync(`../input/${image.name}`, image.data, function (err) {
        if (err) {
            return console.log(err);
        }
    });
    console.log("Processning")
    exec('cd .. ; python3 face-count.py',(err,stdout)=>{
        console.log("Processing done")
        console.log(stdout)
    })
    res.status(201).send("Image updated successfully")
})

app.get('/studentcount',(req,res)=>{
    const stringdata = fs.readFileSync("../count.json");
    const parsedData = JSON.parse(stringdata);
    res.json(parsedData);
})

//listener
app.listen(PORT, () => console.log(`Server running at ${PORT}`))