import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../../context/AuthContext';
import { uploadImage as uploadImageService } from '../services/chatService';

interface UseImageUploadResult {
  uploading: boolean;
  uploadImage: (file: File) => Promise<string | null>;
}

export function useImageUpload(): UseImageUploadResult {
  const { token } = useAuthContext();
  const [uploading, setUploading] = useState(false);

  async function uploadImage(file: File): Promise<string | null> {
    if (!token) return null;
    setUploading(true);
    try {
      return await uploadImageService(token, file);
    } catch {
      toast.error('Failed to upload image.');
      return null;
    } finally {
      setUploading(false);
    }
  }

  return { uploading, uploadImage };
}
