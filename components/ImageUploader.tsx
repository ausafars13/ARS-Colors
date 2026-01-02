
import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string, mimeType: string) => void;
  onClear?: () => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, onClear, isLoading }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const resizeAndCompress = (file: File): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1024;
          const MAX_HEIGHT = 1024;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas context failed'));
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Force JPEG for better API compatibility and smaller payload
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          const parts = dataUrl.split(',');
          const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
          const b64 = parts[1];
          
          resolve({ base64: b64, mimeType: mime });
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { base64, mimeType } = await resizeAndCompress(file);
      setPreview(`data:${mimeType};base64,${base64}`);
      onImageSelected(base64, mimeType);
    } catch (err) {
      console.error("Error processing image:", err);
      alert("Failed to process image. Please try another file.");
    }
  }, [onImageSelected]);

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (onClear) onClear();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className={`relative group border-2 border-dashed rounded-2xl p-4 transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] ${
        preview ? 'border-indigo-200 bg-gray-50' : 'border-gray-300 hover:border-indigo-400 bg-white'
      }`}>
        {!preview && (
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        )}
        
        {preview ? (
          <div className="relative w-full rounded-xl overflow-hidden shadow-md bg-white flex items-center justify-center min-h-[300px] max-h-[600px]">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-w-full max-h-[600px] w-auto h-auto object-contain block mx-auto" 
            />
            
            {!isLoading && (
              <div className="absolute top-4 right-4 flex space-x-2 z-20">
                <button
                  onClick={handleReset}
                  className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 active:scale-95 border border-gray-100"
                  title="Remove image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-20">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white font-medium text-sm tracking-wide">Normalizing Palette...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900">Upload product image</p>
            <p className="text-sm text-gray-500 mt-1">Carpet, interior space, or sample swatch</p>
            <div className="mt-6">
              <span className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-xl shadow-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all cursor-pointer">
                Choose File
              </span>
            </div>
          </div>
        )}
      </div>
      <p className="text-[10px] text-center text-gray-400 mt-4 uppercase font-bold tracking-widest">Optimized for high-speed analysis</p>
    </div>
  );
};

export default ImageUploader;
