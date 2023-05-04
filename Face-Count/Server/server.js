const express = require('express')
const filUpload = require('express-fileupload')
const cors = require('cors')
const app = express()
const fs = require('fs')
const { exec } = require('child_process')
const PORT = process.env.PORT || 3001
const dotenv = require("dotenv")
const class_attandence = require("./db")
dotenv.config()

//middleware
app.use(cors())
app.use(express.json());
app.use(filUpload());


//db connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to DB")
}).catch(err => {
    console.log(err)
})

//api endpoints
app.get('/', (req, res) => {
    // res.status(200).send("Hola")
    req.send('index.html')
})

app.get('/getCount/:class', async (req, res) => {
    captureImage(req.params.class);
    await processImage(res, req.params.class).then((count) => {
    }).catch(() => {
        res.status(500).send("Uable to process request!")
    });
})

app.get('/getCount/all', async (req, res) => {
    captureImage(0);
    await processImage(res, 0).then((count) => {
    }).catch(() => {
        res.status(500).send("Uable to process request!")
    });
})



// app.get('/studentcount', (req, res) => {
//     const stringdata = fs.readFileSync("../count.json");
//     const parsedData = JSON.parse(stringdata);
//     res.json(parsedData);
// })

//listener
app.listen(PORT, () => console.log(`Server running at ${PORT}`))



// drivers

const captureImage = (clas) => {
    if (clas === 0) {
        // capture image for every class
    }
    else
        exec(`python3 SendImage.py ${clas}`, (err, stdout) => {
            console.log("Image captured successfully 👍")
        })
}

const processImage = async (res, clas) => {
    exec('cd .. ; python3 face-count.py', (err, stdout) => {
        console.log("Processing done")
        saveCount(clas, stdout)
        console.log(stdout)
        res.status(200).json({ class: clas, count: stdout })
    })
}

const saveCount = async (classname, count) => {
    const data = {
        className: classname,
        count: count,
        date: new Date()
    }
    const new_count = new class_attandence(data)
    await new_count.save().then(() => {
        console.log("updated db successfully 👍")
    })
}