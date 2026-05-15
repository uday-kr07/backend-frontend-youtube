import multer from 'multer';
import fs from "fs";
import path from "path";

const tempDir = path.resolve(process.cwd(), "public", "temp");

if (fs.existsSync(tempDir) && !fs.statSync(tempDir).isDirectory()) {
    fs.unlinkSync(tempDir);
}

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, tempDir)
    },
    filename: function (req, file, cb) {
    
    //cb(null, file.originalname)

    cb(null, Date.now() + "-" + file.originalname)

    }
})

export const upload = multer({ storage,})
