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

app.get('/getCounts/all', async (req, res) => {
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
        const classes = [1, 2, 3, 4]
        let i = 0
        const timer = setInterval(() => {
            if (i === 4) clearInterval(timer)
            else
                exec(`python3 SendImage.py ${classes[i]}`, (err, stdout) => {
                    console.log("Image captured successfully 👍")
                })
            i++;
        }, 800);
    }
    else
        exec(`python3 SendImage.py ${clas}`, (err, stdout) => {
            console.log("Image captured successfully 👍")
        })
}

const processImage = async (res, clas) => {
    if (clas === 0) {
        exec('cd .. ; python3 face-count.py', (err, stdout) => {
            console.log("Processing done")
            const class_count_arr = stdout.split(" ")
            const final_arr = class_count_arr.map((data) => {
                const [classname, count] = data.split("@")
                // saveCount(classname, count)
                return { class: classname.split("-")[1], count: count }
            })
            console.log(final_arr)
            res.status(200).json(final_arr)
        })
    }
    else
        exec('cd .. ; python3 face-count.py', (err, stdout) => {
            console.log("Processing done")
            const [classname, count] = stdout.split("@")
            saveCount(classname.split("-")[1], count)
            console.log(classname.split("-")[1], count)
            res.status(200).json({ class: classname.split("-")[1], count: count })
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