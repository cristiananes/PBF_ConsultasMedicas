import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import crypto from 'crypto';

const saveFile = async (file, width) => {
    try {
        const uploadsPath = path.join(process.cwd(), 'public/uploads');

        // Verifica si la carpeta de uploads existe, y si no, la crea
        try {
            await fs.access(uploadsPath);
        } catch {
            await fs.mkdir(uploadsPath, { recursive: true });
        }

        // Genera un nombre único para el archivo
        const fileName = `${crypto.randomUUID()}_${file.originalname}`;
        const filePath = path.join(uploadsPath, fileName);

        // Si es una imagen, redimensiona con sharp
        if (file.mimetype.startsWith('image/')) {
            const sharpImg = sharp(file.path);
            sharpImg.resize(Number(width));
            await sharpImg.toFile(filePath);
        } else {
            // Para otros archivos (videos, PDFs), simplemente lo guarda
            await fs.copyFile(file.path, filePath);
        }

        // Elimina el archivo temporal
        await fs.unlink(file.path);

        return fileName;
    } catch (err) {
        console.error(err);
        throw new Error('Error al guardar el archivo.');
    }
};

export default saveFile;
