import { marked } from 'marked';
import type {
  Metadata,
  TechStack,
  Architecture,
  Components,
  Workflows,
  DeepDives,
  ContentData,
} from '../types';

export async function loadMetadata(): Promise<Metadata> {
  const response = await fetch('/content/metadata.json');
  if (!response.ok) {
    throw new Error('Failed to load metadata');
  }
  return response.json();
}

export async function loadOverview(): Promise<string> {
  const response = await fetch('/content/overview.md');
  if (!response.ok) {
    throw new Error('Failed to load overview');
  }
  const markdown = await response.text();
  return marked(markdown) as string;
}

export async function loadTechStack(): Promise<TechStack> {
  const response = await fetch('/content/tech-stack.json');
  if (!response.ok) {
    throw new Error('Failed to load tech stack');
  }
  return response.json();
}

export async function loadArchitecture(): Promise<Architecture> {
  const response = await fetch('/content/architecture.json');
  if (!response.ok) {
    throw new Error('Failed to load architecture');
  }
  return response.json();
}

export async function loadComponents(): Promise<Components> {
  const response = await fetch('/content/components.json');
  if (!response.ok) {
    throw new Error('Failed to load components');
  }
  return response.json();
}

export async function loadWorkflows(): Promise<Workflows> {
  const response = await fetch('/content/workflows.json');
  if (!response.ok) {
    throw new Error('Failed to load workflows');
  }
  return response.json();
}

export async function loadDeepDives(): Promise<DeepDives> {
  const response = await fetch('/content/deep-dives.json');
  if (!response.ok) {
    throw new Error('Failed to load deep dives');
  }
  return response.json();
}

export async function loadSetup(): Promise<string> {
  const response = await fetch('/content/setup.md');
  if (!response.ok) {
    throw new Error('Failed to load setup guide');
  }
  const markdown = await response.text();
  return marked(markdown) as string;
}

export async function loadAllContent(): Promise<ContentData> {
  const [
    metadata,
    overview,
    techStack,
    architecture,
    components,
    workflows,
    deepDives,
    setup,
  ] = await Promise.all([
    loadMetadata(),
    loadOverview(),
    loadTechStack(),
    loadArchitecture(),
    loadComponents(),
    loadWorkflows(),
    loadDeepDives(),
    loadSetup(),
  ]);

  return {
    metadata,
    overview,
    techStack,
    architecture,
    components,
    workflows,
    deepDives,
    setup,
  };
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
