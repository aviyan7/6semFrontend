import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressorService {
  compressImage(file: File): Promise<{ file: File, previewUrl: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800; // Define the maximum width for the resized image
          const scaleSize = MAX_WIDTH / img.width;
          const MAX_HEIGHT = img.height * scaleSize;
          canvas.width = MAX_WIDTH;
          canvas.height = MAX_HEIGHT;
          const ctx = canvas.getContext('2d');
          // @ts-ignore
          ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);
          canvas.toBlob((blob: any) => {
            const compressedFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });
            const previewUrl = URL.createObjectURL(compressedFile);
            resolve({ file: compressedFile, previewUrl });
          }, 'image/jpeg', 0.8);
        };
      };

      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
