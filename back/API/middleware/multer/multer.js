import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

export const upload = multer({
    storage: storage,
    limits: { fileSize: 700000 }, // Limite à 700 Ko
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extName && mimeType) {
            return cb(null, true);
        } else {
            cb(new Error("Only images are allowed!"));
        }
    },
});
