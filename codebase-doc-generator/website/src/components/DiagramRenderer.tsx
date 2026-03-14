import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { AlertCircle, Loader2 } from 'lucide-react';

interface DiagramRendererProps {
  diagram: string;
}

const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagram }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !diagram) return;

    const renderDiagram = async () => {
      try {
        setLoading(true);
        setError(null);

        const isDarkMode = document.documentElement.classList.contains('dark');
        mermaid.initialize({
          startOnLoad: false,
          theme: isDarkMode ? 'dark' : 'default',
          securityLevel: 'loose',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
          },
        });

        const { svg } = await mermaid.render(
          `mermaid-diagram-${Math.random().toString(36).substr(2, 9)}`,
          diagram
        );

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Failed to render Mermaid diagram:', err);
        setError('Failed to render diagram');
      } finally {
        setLoading(false);
      }
    };

    renderDiagram();
  }, [diagram]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500 dark:text-gray-400 mr-2" />
        <span className="text-gray-500 dark:text-gray-400">Rendering diagram...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
            <details className="mt-2 text-sm text-red-700 dark:text-red-400">
              <summary className="cursor-pointer">View diagram source</summary>
              <pre className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded text-xs overflow-x-auto">
                {diagram}
              </pre>
            </details>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm overflow-x-auto"
    />
  );
};

export default DiagramRenderer;
