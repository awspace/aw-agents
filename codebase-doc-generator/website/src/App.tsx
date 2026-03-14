import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import TechStack from './pages/TechStack';
import Architecture from './pages/Architecture';
import Components from './pages/Components';
import Workflows from './pages/Workflows';
import DeepDives from './pages/DeepDives';
import SetupGuide from './pages/SetupGuide';
import { loadAllContent } from './utils/contentLoader';
import type { ContentData } from './types';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await loadAllContent();
        setContent(data);
      } catch (err) {
        console.error('Failed to load content:', err);
        setError('Failed to load documentation content. Please ensure the content files exist in the public/content directory.');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading documentation...</p>
        </div>
      </div>
    );
  }

  const handleContentChange = (newContent: any) => {
    setContent(newContent);
    setError(null);
  };

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const handleErrorChange = (newError: string | null) => {
    setError(newError);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading documentation...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Error Loading Content</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error || 'Unknown error occurred'}</p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
            <p className="font-medium mb-2">Possible solutions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ensure the codebase-doc-generator agent has generated content files</li>
              <li>Check that all required JSON files exist in public/content/</li>
              <li>Verify the JSON files follow the correct schema</li>
              <li>Check the browser console for detailed error information</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout
        metadata={content.metadata}
        onContentChange={handleContentChange}
        onLoadingChange={handleLoadingChange}
        onErrorChange={handleErrorChange}
      >
        <Routes>
          <Route
            path="/"
            element={<Overview metadata={content.metadata} overviewContent={content.overview} />}
          />
          <Route
            path="/tech-stack"
            element={<TechStack techStack={content.techStack} />}
          />
          <Route
            path="/architecture"
            element={<Architecture architecture={content.architecture} />}
          />
          <Route
            path="/components"
            element={<Components components={content.components} />}
          />
          <Route
            path="/workflows"
            element={<Workflows workflows={content.workflows} />}
          />
          <Route
            path="/deep-dives"
            element={<DeepDives deepDives={content.deepDives} />}
          />
          <Route
            path="/setup"
            element={<SetupGuide setupContent={content.setup} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
