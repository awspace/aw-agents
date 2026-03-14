import React from 'react';
import SectionPage from '../components/SectionPage';
import { ClipboardList } from 'lucide-react';

interface SetupGuideProps {
  setupContent: string;
}

const SetupGuide: React.FC<SetupGuideProps> = ({ setupContent }) => {
  return (
    <SectionPage
      title="Setup Guide"
      description="Step-by-step instructions for setting up, configuring, and using the project"
    >
      <div className="card">
        <div className="flex items-center mb-6">
          <ClipboardList className="w-6 h-6 text-green-500 mr-2" />
          <h2 className="text-xl font-bold">Getting Started</h2>
        </div>
        <div
          className="markdown-content prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: setupContent }}
        />
      </div>
    </SectionPage>
  );
};

export default SetupGuide;
