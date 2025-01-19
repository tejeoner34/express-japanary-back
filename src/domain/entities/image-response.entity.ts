import { UploadApiResponse } from 'cloudinary';

export interface ImageResponse {
  id: string;
  url: string;
}

export const imagesResponseAdapter = (images: UploadApiResponse[]): ImageResponse[] =>
  images.map((image) => ({
    id: image.public_id,
    url: image.secure_url,
  }));
