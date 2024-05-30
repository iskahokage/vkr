import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

const root = path.resolve(__dirname, '../..');
const uploadDir = path.join(root, 'assets/userAvatars');

// Функция для создания папки, если она не существует
const createUploadDir = async () => {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
    console.log(`Directory ${uploadDir} is ready.`);
  } catch (error) {
    console.error(`Error creating directory ${uploadDir}:`, error);
  }
};

// Создаем папку при инициализации
createUploadDir();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const date = Date.now()
    cb(null, date + '-' + file.originalname);
  }
});

// Создаем инстанс multer
const fileMiddleware = multer({ storage });

export default fileMiddleware;