import React from 'react';
import SectionPage from '../components/SectionPage';
import type { Metadata } from '../types';
import { Code, FileCode, Layers, Users } from 'lucide-react';

interface OverviewProps {
  metadata: Metadata | null;
  overviewContent: string;
}

const Overview: React.FC<OverviewProps> = ({ metadata, overviewContent }) => {
  if (!metadata) {
    return null;
  }

  const stats = [
    {
      icon: <FileCode className="w-6 h-6 text-blue-500" />,
      label: 'Total Files',
      value: metadata.stats.totalFiles.toLocaleString(),
    },
    {
      icon: <Code className="w-6 h-6 text-green-500" />,
      label: 'Lines of Code',
      value: metadata.stats.totalLinesOfCode.toLocaleString(),
    },
    {
      icon: <Layers className="w-6 h-6 text-purple-500" />,
      label: 'Components',
      value: metadata.stats.componentsCount.toString(),
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      label: 'Features',
      value: metadata.stats.featuresCount.toString(),
    },
  ];

  return (
    <SectionPage
      title={metadata.projectName}
      description={metadata.projectDescription}
    >
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg mr-3">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Metadata */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Project Information</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Primary Languages
            </dt>
            <dd className="flex flex-wrap gap-2">
              {metadata.primaryLanguages.map((lang, index) => (
                <span
                  key={index}
                  className="badge bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {lang}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Key Frameworks
            </dt>
            <dd className="flex flex-wrap gap-2">
              {metadata.keyFrameworks.map((framework, index) => (
                <span
                  key={index}
                  className="badge bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  {framework}
                </span>
              ))}
            </dd>
          </div>
          {metadata.license && (
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                License
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white">
                {metadata.license}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Documentation Generated
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white">
              {new Date(metadata.generationDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </dd>
          </div>
        </dl>
      </div>

      {/* Overview content */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Project Overview</h2>
        <div
          className="markdown-content prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: overviewContent }}
        />
      </div>
    </SectionPage>
  );
};

export default Overview;
