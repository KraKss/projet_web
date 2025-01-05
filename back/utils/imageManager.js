import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

export const saveImage = (imageBuffer, imageName, destFolder) => {
    const folderPath = path.resolve(destFolder);

    return sharp(imageBuffer)
        .jpeg()
        .resize({
            fit: 'inside',
            width: 100,
            height: 100
        })
        .toFile(`${folderPath}/${imageName}.jpeg`);
};

export const deleteImage = (imagePath) => {
    return new Promise((resolve, reject) => {
        // Construire le chemin complet vers le fichier
        const fullImagePath = path.resolve("upload", imagePath);
        fs.unlink(fullImagePath, (err) => {
            if (err) {
                reject(new Error(`Error deleting image: ${err.message}`));
            } else {
                resolve("Image deleted successfully");
            }
        });
    });
};