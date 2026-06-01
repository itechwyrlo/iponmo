import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { uploadQrCode as uploadQrCodeService } from '../services/profileService';
import type { ProfileResponse } from '../types/profile.types';

interface UseUploadQrCodeReturn {
  uploading: boolean;
  uploadError: string | null;
  uploadQrCode: (file: File) => Promise<ProfileResponse>;
}

export function useUploadQrCode(): UseUploadQrCodeReturn {
  const { token } = useAuthContext();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function uploadQrCode(file: File): Promise<ProfileResponse> {
    if (!token) throw new Error('Not authenticated.');
    setUploading(true);
    setUploadError(null);
    try {
      return await uploadQrCodeService(token, file);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload QR code.';
      setUploadError(message);
      throw err;
    } finally {
      setUploading(false);
    }
  }

  return { uploading, uploadError, uploadQrCode };
}
