import { marked } from 'marked';
import type {
  Metadata,
  TechStack,
  Architecture,
  Components,
  Workflows,
  DeepDives,
  ContentData,
  DocManifest,
} from '../types';

let currentDocSet = '';

export async function loadDocManifest(): Promise<DocManifest> {
  const response = await fetch('/docs/manifest.json');
  if (!response.ok) {
    throw new Error('Failed to load documentation manifest');
  }
  return response.json();
}

export function setCurrentDocSet(docSetPath: string): void {
  currentDocSet = docSetPath;
}

export function getContentBasePath(): string {
  return currentDocSet ? `/docs/${currentDocSet}` : '/content';
}

export async function loadMetadata(): Promise<Metadata> {
  const response = await fetch(`${getContentBasePath()}/metadata.json`);
  if (!response.ok) {
    throw new Error('Failed to load metadata');
  }
  return response.json();
}

export async function loadOverview(): Promise<string> {
  const response = await fetch(`${getContentBasePath()}/overview.md`);
  if (!response.ok) {
    throw new Error('Failed to load overview');
  }
  const markdown = await response.text();
  return marked(markdown) as string;
}

export async function loadTechStack(): Promise<TechStack> {
  const response = await fetch(`${getContentBasePath()}/tech-stack.json`);
  if (!response.ok) {
    throw new Error('Failed to load tech stack');
  }
  return response.json();
}

export async function loadArchitecture(): Promise<Architecture> {
  const response = await fetch(`${getContentBasePath()}/architecture.json`);
  if (!response.ok) {
    throw new Error('Failed to load architecture');
  }
  return response.json();
}

export async function loadComponents(): Promise<Components> {
  const response = await fetch(`${getContentBasePath()}/components.json`);
  if (!response.ok) {
    throw new Error('Failed to load components');
  }
  return response.json();
}

export async function loadWorkflows(): Promise<Workflows> {
  const response = await fetch(`${getContentBasePath()}/workflows.json`);
  if (!response.ok) {
    throw new Error('Failed to load workflows');
  }
  return response.json();
}

export async function loadDeepDives(): Promise<DeepDives> {
  const response = await fetch(`${getContentBasePath()}/deep-dives.json`);
  if (!response.ok) {
    throw new Error('Failed to load deep dives');
  }
  return response.json();
}

export async function loadSetup(): Promise<string> {
  const response = await fetch(`${getContentBasePath()}/setup.md`);
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
