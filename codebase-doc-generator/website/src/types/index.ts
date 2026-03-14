export interface Metadata {
  projectName: string;
  projectDescription: string;
  primaryLanguages: string[];
  keyFrameworks: string[];
  license: string | null;
  generationDate: string;
  stats: {
    totalFiles: number;
    totalLinesOfCode: number;
    componentsCount: number;
    featuresCount: number;
  };
}

export interface Technology {
  name: string;
  version: string | null;
  purpose: string;
}

export interface Language extends Technology {
  usagePercentage: number | null;
}

export interface Framework extends Technology {
  category: 'frontend' | 'backend' | 'testing' | 'build';
}

export interface Library extends Technology {}

export interface Tool {
  name: string;
  purpose: string;
}

export interface TechStack {
  languages: Language[];
  frameworks: Framework[];
  libraries: Library[];
  tools: Tool[];
}

export interface MermaidDiagram {
  name: string;
  description: string;
  mermaidSyntax: string;
}

export interface ArchitectureLayer {
  name: string;
  responsibility: string;
  components: string[];
}

export interface Architecture {
  architecturePattern: string;
  highLevelDescription: string;
  diagrams: MermaidDiagram[];
  layers: ArchitectureLayer[];
}

export interface Component {
  id: string;
  name: string;
  type: 'module' | 'class' | 'service' | 'utility' | 'component';
  location: string;
  responsibility: string;
  keyFiles: string[];
  dependencies: string[];
  dependents: string[];
  keyExports: string[];
}

export interface Components {
  components: Component[];
}

export interface WorkflowStep {
  stepNumber: number;
  description: string;
  component: string;
  action: string;
}

export interface Workflow {
  name: string;
  description: string;
  trigger: string;
  steps: WorkflowStep[];
  diagramMermaid: string | null;
}

export interface Workflows {
  workflows: Workflow[];
}

export interface CodeExample {
  filePath: string;
  snippet: string;
  explanation: string;
}

export interface Feature {
  name: string;
  description: string;
  businessValue: string;
  implementationOverview: string;
  keyComponents: string[];
  codeExamples: CodeExample[];
}

export interface DeepDives {
  features: Feature[];
}

export interface ContentData {
  metadata: Metadata;
  overview: string;
  techStack: TechStack;
  architecture: Architecture;
  components: Components;
  workflows: Workflows;
  deepDives: DeepDives;
  setup: string;
}
