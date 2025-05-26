import express from 'express';
import multer from 'multer';
import auth from '../middlewares/auth.js';
import { File } from '../models/index.js';
import { LocalQueue } from '../queues/localQueue.js';

const queue = new LocalQueue('fileQueue');

const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });
const router = express.Router();

router.post('/', auth, upload.single('file'), async (req, res) => {
  const { title, description } = req.body;
  const { file } = req;

  const record = await File.create({
    user_id: req.user.id,
    original_filename: file.originalname,
    storage_path: file.path,
    title,
    description,
  });

  await queue.add('processFile', { fileId: record.id });

  res.json({ fileId: record.id, status: 'uploaded' });
});

export default router;
