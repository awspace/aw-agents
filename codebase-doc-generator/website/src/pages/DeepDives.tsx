import React, { useState } from 'react';
import SectionPage from '../components/SectionPage';
import CodeBlock from '../components/CodeBlock';
import type { DeepDives as DeepDivesType } from '../types';
import { FileCode, ChevronDown, ChevronUp } from 'lucide-react';

interface DeepDivesProps {
  deepDives: DeepDivesType | null;
}

const DeepDives: React.FC<DeepDivesProps> = ({ deepDives }) => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  if (!deepDives) {
    return null;
  }

  const toggleFeature = (featureName: string) => {
    if (expandedFeature === featureName) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(featureName);
    }
  };

  return (
    <SectionPage
      title="Deep Dives"
      description="In-depth analysis of key features and implementation details"
    >
      <div className="space-y-6">
        {deepDives.features.map((feature, index) => {
          const isExpanded = expandedFeature === feature.name;

          return (
            <div key={index} className="card">
              <button
                onClick={() => toggleFeature(feature.name)}
                className="w-full text-left flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <FileCode className="w-6 h-6 text-purple-500 mr-2" />
                    <h2 className="text-xl font-bold">{feature.name}</h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {feature.keyComponents.map((component, compIndex) => (
                      <span
                        key={compIndex}
                        className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4 mt-2">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Business Value</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {feature.businessValue}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Implementation Overview</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {feature.implementationOverview}
                      </p>
                    </div>

                    {feature.codeExamples.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Code Examples</h3>
                        <div className="space-y-6">
                          {feature.codeExamples.map((example, exampleIndex) => (
                            <div key={exampleIndex}>
                              <div className="flex items-center justify-between mb-2">
                                <code className="text-sm text-gray-500 dark:text-gray-400">
                                  {example.filePath}
                                </code>
                              </div>
                              <CodeBlock code={example.snippet} />
                              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {example.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {deepDives.features.length === 0 && (
        <div className="text-center py-12">
          <FileCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No deep dive features documented</p>
        </div>
      )}
    </SectionPage>
  );
};

export default DeepDives;
