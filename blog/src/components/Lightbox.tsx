import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface LightboxProps {
  src: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ src, alt, isOpen, onClose }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black/90 backdrop-blur-sm',
        'animate-in fade-in duration-200',
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 text-white/80 hover:text-white"
        aria-label="Close lightbox"
      >
        <X className="h-8 w-8" />
      </button>

      {/* 图片容器 */}
      <div className="flex h-full w-full items-center justify-center p-4">
        <img
          src={src}
          alt={alt}
          className={clsx(
            'max-h-[90vh] max-w-[90vw] object-contain',
            'rounded-lg shadow-2xl',
            'animate-in zoom-in-95 duration-300',
          )}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
