// middleware/wellKnown.js
import fs from 'fs';
import path from 'path';

export default async function (req, res, next) {
  const filePath = path.resolve(__dirname, '..', 'static', '.well-known', req.params.path);
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    res.sendFile(filePath);
  } catch (error) {
    res.status(404).send('File not found');
  }
}
