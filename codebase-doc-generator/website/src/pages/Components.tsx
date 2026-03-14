import React, { useState } from 'react';
import SectionPage from '../components/SectionPage';
import type { Components as ComponentsType } from '../types';
import { Boxes, Search, ArrowRight, ArrowLeft, FileCode } from 'lucide-react';

interface ComponentsProps {
  components: ComponentsType | null;
}

const Components: React.FC<ComponentsProps> = ({ components }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  if (!components) {
    return null;
  }

  const filteredComponents = components.components.filter((component) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      component.name.toLowerCase().includes(searchLower) ||
      component.type.toLowerCase().includes(searchLower) ||
      component.responsibility.toLowerCase().includes(searchLower)
    );
  });

  const selectedComponentData = selectedComponent
    ? components.components.find((c) => c.id === selectedComponent)
    : null;

  const typeColors = {
    module: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    class: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    service: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    utility: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    component: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  };

  if (selectedComponentData) {
    return (
      <SectionPage
        title={selectedComponentData.name}
        description={selectedComponentData.responsibility}
      >
        <button
          onClick={() => setSelectedComponent(null)}
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to components list
        </button>

        <div className="card">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`badge ${typeColors[selectedComponentData.type]}`}>
              {selectedComponentData.type}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Location
              </h3>
              <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded text-sm">
                {selectedComponentData.location}
              </code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Key Files
              </h3>
              <ul className="space-y-1">
                {selectedComponentData.keyFiles.map((file, index) => (
                  <li key={index} className="flex items-center">
                    <FileCode size={16} className="mr-2 text-gray-400" />
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                      {file}
                    </code>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Dependencies
              </h3>
              {selectedComponentData.dependencies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedComponentData.dependencies.map((depId, index) => {
                    const dep = components.components.find((c) => c.id === depId);
                    return dep ? (
                      <button
                        key={index}
                        onClick={() => setSelectedComponent(dep.id)}
                        className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        {dep.name}
                      </button>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No dependencies</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Dependents
              </h3>
              {selectedComponentData.dependents.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedComponentData.dependents.map((depId, index) => {
                    const dep = components.components.find((c) => c.id === depId);
                    return dep ? (
                      <button
                        key={index}
                        onClick={() => setSelectedComponent(dep.id)}
                        className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        {dep.name}
                      </button>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No dependents</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Key Exports
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedComponentData.keyExports.map((exp, index) => (
                  <code
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm"
                  >
                    {exp}
                  </code>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionPage>
    );
  }

  return (
    <SectionPage
      title="Components"
      description="Breakdown of all major components and their responsibilities"
    >
      {/* Search */}
      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search components by name, type, or responsibility..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Components list */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map((component) => (
          <div
            key={component.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{component.name}</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <span className={`badge ${typeColors[component.type]} mb-2 inline-block`}>
              {component.type}
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
              {component.responsibility}
            </p>
          </div>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <Boxes className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No components match your search</p>
        </div>
      )}
    </SectionPage>
  );
};

export default Components;
