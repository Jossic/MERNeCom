import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetype.test(path.extname(file.originalname).toLocaleLowerCase())
    const minetype = filetypes.test(file.minetype)

    if (extname && minetype) {
        return cb(null, true)
    } else {
        cb('Seulement des images !')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checlFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router

