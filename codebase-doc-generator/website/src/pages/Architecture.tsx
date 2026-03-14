import React from 'react';
import SectionPage from '../components/SectionPage';
import DiagramRenderer from '../components/DiagramRenderer';
import type { Architecture as ArchitectureType } from '../types';
import { Layers, Workflow as Diagram } from 'lucide-react';

interface ArchitectureProps {
  architecture: ArchitectureType | null;
}

const Architecture: React.FC<ArchitectureProps> = ({ architecture }) => {
  if (!architecture) {
    return null;
  }

  return (
    <SectionPage
      title="Architecture"
      description="High-level system architecture and design patterns"
    >
      <div className="card">
        <div className="flex items-center mb-4">
          <Layers className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-bold">Architecture Overview</h2>
        </div>
        <div className="mb-4">
          <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-3 inline-block">
            {architecture.architecturePattern}
          </span>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            {architecture.highLevelDescription}
          </p>
        </div>
      </div>

      {/* Diagrams */}
      {architecture.diagrams.length > 0 && (
        <div className="card">
          <div className="flex items-center mb-4">
            <Diagram className="w-6 h-6 text-purple-500 mr-2" />
            <h2 className="text-xl font-bold">Architecture Diagrams</h2>
          </div>
          <div className="space-y-6">
            {architecture.diagrams.map((diagram, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">{diagram.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{diagram.description}</p>
                <DiagramRenderer diagram={diagram.mermaidSyntax} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Layers */}
      {architecture.layers.length > 0 && (
        <div className="card">
          <div className="flex items-center mb-4">
            <Layers className="w-6 h-6 text-green-500 mr-2" />
            <h2 className="text-xl font-bold">System Layers</h2>
          </div>
          <div className="space-y-4">
            {architecture.layers.map((layer, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{layer.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {layer.responsibility}
                </p>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Components in this layer:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {layer.components.map((component, compIndex) => (
                      <span
                        key={compIndex}
                        className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionPage>
  );
};

export default Architecture;
