const multer = require('multer')

const storege = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now())
    }
})

const uploads = multer({ storage: storege }).single('image')

module.exports = uploads