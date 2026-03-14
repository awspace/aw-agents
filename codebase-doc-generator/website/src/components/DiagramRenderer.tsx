import React, { useMemo, useState } from 'react';
import { Code } from 'lucide-react';

interface DiagramRendererProps {
  diagram: string;
  preRenderedSvg?: string;
}

const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagram, preRenderedSvg }) => {
  const [showRaw, setShowRaw] = useState(false);

  // Clean up diagram content
  const cleanDiagram = useMemo(() => {
    if (!diagram) return '';
    return diagram.trim().replace(/^```mermaid\s*/, '').replace(/```$/, '').trim();
  }, [diagram]);

  // Get safe SVG content
  const svgContent = (preRenderedSvg || '').trim();

  return (
    <>
      {/* Render SVG if available */}
      {svgContent ? (
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">Diagram pre-rendered during documentation generation</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Regenerate documentation to see this diagram</p>
        </div>
      )}

      {/* Raw source toggle */}
      <div className="mt-2 flex justify-end">
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
    </>
  );
};

export default DiagramRenderer;
