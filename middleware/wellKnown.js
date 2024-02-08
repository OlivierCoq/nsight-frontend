// middleware/wellKnown.js
import { existsSync } from 'fs';
import path from 'path'; // Importing path module

export default function (req, res, next) {
  const filePath = path.resolve(__dirname, '..', 'static', '.well-known', req.params.path);
  if (existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
}
