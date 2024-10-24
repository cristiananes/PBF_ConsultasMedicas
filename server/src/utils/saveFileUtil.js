// Importamos dependencias

import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import crypto from 'crypto';

const saveFile = async (file, width) => {
    try {
        const uploadsPath = path.join(process.cwd(), 'public', 'uploads');

        console.log('uploadsPath', uploadsPath);

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
            console.log(
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaa'
            );
            // Para otros archivos (videos, PDFs), simplemente lo guarda i
            await fs.copyFile(file.path, filePath);
        }

        // Elimina el archivo temporal
        console.log('>>>>>>>>>', path.join(process.cwd(), file.path));
        try {
            await fs.unlink(path.join(process.cwd(), file.path));
        } catch (e) {
            console.log(
                'Error a eliminar ',
                path.join(process.cwd(), file.path)
            );
        }

        return fileName;
    } catch (err) {
        console.error(err);
        throw new Error('Error al guardar el archivo.');
    }
};

export default saveFile;
