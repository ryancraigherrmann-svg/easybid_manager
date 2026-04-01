import { Router, Request, Response } from 'express';
import multer from 'multer';
import { uploadFile, getDownloadUrl, deleteFile } from '../services/s3Service';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

const router = Router();

/**
 * POST /api/upload
 * Accepts multipart form-data with field name "files" (up to 10 files).
 * Returns an array of { key, url } objects.
 */
router.post('/upload', upload.array('files', 10), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files?.length) {
      res.status(400).json({ error: 'No files provided' });
      return;
    }

    const results = await Promise.all(
      files.map((f) => uploadFile(f.buffer, f.originalname, f.mimetype)),
    );

    res.json(results);
  } catch (err) {
    console.error('POST /api/upload error', err);
    res.status(500).json({ error: String(err) });
  }
});

/**
 * GET /api/files/:key(*)
 * Returns a fresh presigned download URL for the given S3 key.
 */
router.get('/files/:key(*)', async (req: Request, res: Response) => {
  try {
    const url = await getDownloadUrl(req.params.key);
    res.json({ url });
  } catch (err) {
    console.error('GET /api/files error', err);
    res.status(500).json({ error: String(err) });
  }
});

/**
 * DELETE /api/files/:key(*)
 * Deletes the file from S3.
 */
router.delete('/files/:key(*)', async (req: Request, res: Response) => {
  try {
    await deleteFile(req.params.key);
    res.status(204).send();
  } catch (err) {
    console.error('DELETE /api/files error', err);
    res.status(500).json({ error: String(err) });
  }
});

export default router;
