
'use server';

import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (file: File, path: string): Promise<string> => {
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const blobPath = `${path}/${fileName}`;

  const { url } = await put(blobPath, file, {
    access: 'public',
  });

  return url;
};
