import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { clsx } from 'clsx';

interface LightboxProps {
  src: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNavigation?: boolean;
}

export default function Lightbox({
  src,
  alt,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNavigation = false,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowRight') {
        onNext?.();
      }
      if (event.key === 'ArrowLeft') {
        onPrevious?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

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

      {hasNavigation && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious?.();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white sm:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white sm:right-6"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </>
      )}

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
