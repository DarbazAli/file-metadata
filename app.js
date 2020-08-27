const express = require('express')
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

const app = express();

app.listen(3000, () => console.log("Listening on 3000"))

// setup template engine
app.set('views', './views');
app.set('view engine', 'pug');

// serve static files
app.use(express.static(__dirname + '/public'));

// create the home url
app.get('/', (req, res) => {
    res.render('index', {title: 'Home', message: "Hello There"})
})

app.get('/about', (req, res) => {
    res.render('about')
})



// setup post request to upload file
app.post('/api/upload', upload.single('upfile'), (req, res, next) => {
    // {"name":"Reload.svg","type":"image/svg+xml","size":937}
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    })
})