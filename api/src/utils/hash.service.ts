import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hash(text: string): Promise<string> {
    const textHash: string = await bcrypt.hash(text, 5);
    return textHash;
  }

  async compare(text: string, textHash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(text, textHash);
    return isValid;
  }
}
