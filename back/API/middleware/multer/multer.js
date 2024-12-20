import multer from 'multer';
const storage = multer.memoryStorage();
export const upload = multer({
    limits: {
        fileSize: 700000 // 700Ko
    },
    storage: storage
});