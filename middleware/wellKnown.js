// middleware/wellKnown.js
import { resolve } from 'path';
import { existsSync } from 'fs';

export default function (req, res, next) {
  const filePath = resolve(__dirname, '..', 'static', '.well-known', req.params.path);
  if (existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
}
