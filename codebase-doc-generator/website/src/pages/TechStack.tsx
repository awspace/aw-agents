import React from 'react';
import SectionPage from '../components/SectionPage';
import type { TechStack as TechStackType } from '../types';
import { Code, Wrench, Package } from 'lucide-react';

interface TechStackProps {
  techStack: TechStackType | null;
}

const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  if (!techStack) {
    return null;
  }

  const categoryIcons = {
    frontend: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    backend: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    testing: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    build: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  };

  return (
    <SectionPage
      title="Technology Stack"
      description="Languages, frameworks, libraries, and tools used in this project"
    >
      {/* Languages */}
      {techStack.languages.length > 0 && (
        <div className="card">
          <div className="flex items-center mb-4">
            <Code className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-bold">Languages</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.languages.map((lang, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{lang.name}</h3>
                  {lang.version && (
                    <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {lang.version}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  {lang.purpose}
                </p>
                {lang.usagePercentage !== null && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${lang.usagePercentage}%` }}
                      title={`${lang.usagePercentage}% usage`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frameworks */}
      {techStack.frameworks.length > 0 && (
        <div className="card">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 text-purple-500 mr-2" />
            <h2 className="text-xl font-bold">Frameworks</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.frameworks.map((framework, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{framework.name}</h3>
                  {framework.version && (
                    <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {framework.version}
                    </span>
                  )}
                </div>
                <span
                  className={`badge inline-block mb-2 ${categoryIcons[framework.category]}`}
                >
                  {framework.category}
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {framework.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Libraries */}
      {techStack.libraries.length > 0 && (
        <div className="card">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 text-green-500 mr-2" />
            <h2 className="text-xl font-bold">Libraries</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.libraries.map((library, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{library.name}</h3>
                  {library.version && (
                    <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {library.version}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {library.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools */}
      {techStack.tools.length > 0 && (
        <div className="card">
          <div className="flex items-center mb-4">
            <Wrench className="w-6 h-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-bold">Tools</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.tools.map((tool, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {tool.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionPage>
  );
};

export default TechStack;
