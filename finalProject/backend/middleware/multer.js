const multer = require('multer');

const storge = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now())
    }
})

const uploads = multer({ storage: storge });

module.exports = uploads