import express from 'express';
import auth from '../middlewares/auth.js';
import { File } from '../models/index.js';

const router = express.Router();

router.get('/:id', auth, async (req, res) => {
  const file = await File.findByPk(req.params.id);
  if (!file || file.user_id !== req.user.id) {
    return res.status(404).json({ message: 'Not found or unauthorized' });
  }

  res.json({
    id: file.id,
    original_filename: file.original_filename,
    title: file.title,
    description: file.description,
    status: file.status,
    extracted_data: file.extracted_data,
    uploaded_at: file.createdAt,
  });
});

export default router;
