import React from 'react';
import SectionPage from '../components/SectionPage';
import DiagramRenderer from '../components/DiagramRenderer';
import type { Workflows as WorkflowsType } from '../types';
import { GitBranch, Play } from 'lucide-react';

interface WorkflowsProps {
  workflows: WorkflowsType | null;
}

const Workflows: React.FC<WorkflowsProps> = ({ workflows }) => {
  if (!workflows) {
    return null;
  }

  return (
    <SectionPage
      title="Workflows"
      description="Step-by-step execution flows and business processes"
    >
      <div className="space-y-6">
        {workflows.workflows.map((workflow, index) => (
          <div key={index} className="card">
            <div className="flex items-center mb-4">
              <GitBranch className="w-6 h-6 text-blue-500 mr-2" />
              <div>
                <h2 className="text-xl font-bold">{workflow.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {workflow.description}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Play size={16} className="mr-1" />
                <span className="font-medium">Trigger:</span>
                <span className="ml-2">{workflow.trigger}</span>
              </div>
            </div>

            {/* Steps */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Execution Steps</h3>
              <div className="space-y-4">
                {workflow.steps.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold text-sm mr-4 mt-0.5">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white font-medium mb-1">
                        {step.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium mr-2">Component:</span>
                        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">
                          {step.component}
                        </code>
                        <span className="mx-2">→</span>
                        <span>{step.action}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagram */}
            {workflow.diagramMermaid && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Workflow Diagram</h3>
                <DiagramRenderer diagram={workflow.diagramMermaid} preRenderedSvg={workflow.preRenderedSvg} />
              </div>
            )}
          </div>
        ))}
      </div>

      {workflows.workflows.length === 0 && (
        <div className="text-center py-12">
          <GitBranch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No workflows documented</p>
        </div>
      )}
    </SectionPage>
  );
};

export default Workflows;
