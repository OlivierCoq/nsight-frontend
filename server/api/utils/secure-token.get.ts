
import crypto from 'crypto'

export default defineEventHandler(async (event) => {

  return {
    token: crypto.randomBytes(48).toString('hex')
  }

});
