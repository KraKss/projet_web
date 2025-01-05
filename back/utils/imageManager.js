import path from 'path';
import sharp from 'sharp';

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
