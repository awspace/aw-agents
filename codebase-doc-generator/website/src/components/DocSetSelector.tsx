import React, { useState, useEffect } from 'react';
import { ChevronDown, FolderOpen, Loader2 } from 'lucide-react';
import type { DocSet } from '../types';
import { loadDocManifest, setCurrentDocSet, loadAllContent } from '../utils/contentLoader';

interface DocSetSelectorProps {
  onContentChange: (content: any) => void;
  onLoadingChange: (loading: boolean) => void;
  onErrorChange: (error: string | null) => void;
}

const DocSetSelector: React.FC<DocSetSelectorProps> = ({
  onContentChange,
  onLoadingChange,
  onErrorChange,
}) => {
  const [docSets, setDocSets] = useState<DocSet[]>([]);
  const [selectedDocSet, setSelectedDocSet] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadManifest = async () => {
      try {
        const manifest = await loadDocManifest();
        setDocSets(manifest.docSets);
        setSelectedDocSet(manifest.activeDocSet);
      } catch (err) {
        console.error('Failed to load doc manifest:', err);
      }
    };

    loadManifest();
  }, []);

  const handleDocSetChange = async (docSetPath: string) => {
    if (docSetPath === selectedDocSet) {
      setIsOpen(false);
      return;
    }

    try {
      setLoading(true);
      onLoadingChange(true);
      onErrorChange(null);

      setCurrentDocSet(docSetPath);
      const content = await loadAllContent();

      setSelectedDocSet(docSetPath);
      onContentChange(content);
    } catch (err) {
      console.error('Failed to load doc set:', err);
      onErrorChange('Failed to load selected documentation set');
    } finally {
      setLoading(false);
      onLoadingChange(false);
      setIsOpen(false);
    }
  };

  const selectedDocSetInfo = docSets.find((d) => d.path === selectedDocSet);

  if (docSets.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      >
        <div className="flex items-center truncate">
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <FolderOpen className="w-4 h-4 mr-2" />
          )}
          <span className="truncate max-w-[180px]">
            {selectedDocSetInfo?.name || 'Select Documentation'}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div className="py-1">
              {docSets.map((docSet) => (
                <button
                  key={docSet.path}
                  onClick={() => handleDocSetChange(docSet.path)}
                  className={`
                    w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                    ${docSet.path === selectedDocSet ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'}
                  `}
                >
                  <div className="font-medium">{docSet.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {new Date(docSet.generatedDate).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DocSetSelector;
