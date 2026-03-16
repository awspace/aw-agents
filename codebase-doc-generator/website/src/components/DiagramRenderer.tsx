import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Code, Maximize, X } from 'lucide-react';

interface DiagramRendererProps {
  diagram: string;
  preRenderedSvg?: string;
}

const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagram, preRenderedSvg }) => {
  const [showRaw, setShowRaw] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Clean up diagram content
  const cleanDiagram = useMemo(() => {
    if (!diagram) return '';
    return diagram.trim().replace(/^```mermaid\s*/, '').replace(/```$/, '').trim();
  }, [diagram]);

  // Get safe SVG content
  const svgContent = (preRenderedSvg || '').trim();

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomOpen) {
        setIsZoomOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  // Close on click outside modal content
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      setIsZoomOpen(false);
    }
  };

  return (
    <>
      {/* Render SVG if available */}
      {svgContent ? (
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm overflow-x-auto cursor-pointer"
          onClick={() => setIsZoomOpen(true)}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">Diagram pre-rendered during documentation generation</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Regenerate documentation to see this diagram</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-2 flex justify-end gap-3">
        {svgContent && (
          <button
            onClick={() => setIsZoomOpen(true)}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
          >
            <Maximize size={12} />
            Zoom
          </button>
        )}
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
        >
          <Code size={12} />
          {showRaw ? 'Hide source' : 'View source'}
        </button>
      </div>
      {showRaw && (
        <pre className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded text-xs overflow-x-auto font-mono text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
          {cleanDiagram}
        </pre>
      )}

      {/* Zoom modal popup */}
      {isZoomOpen && svgContent && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white dark:bg-gray-900 rounded-lg max-w-[95vw] max-h-[95vh] overflow-auto">
            {/* Close button */}
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-2 right-2 z-10 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white/80 dark:bg-gray-900/80 rounded-full"
            >
              <X size={20} />
            </button>
            {/* Full-size SVG */}
            <div className="p-6" dangerouslySetInnerHTML={{ __html: svgContent }} />
          </div>
        </div>
      )}
    </>
  );
};

export default DiagramRenderer;
