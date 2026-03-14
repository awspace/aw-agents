import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Code2,
  Layers,
  Boxes,
  GitBranch,
  FileCode,
  Settings,
  BookOpen,
} from 'lucide-react';
import type { Metadata } from '../types';
import { formatDate } from '../utils/contentLoader';

interface SidebarProps {
  metadata: Metadata | null;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ metadata, isOpen, onClose }) => {
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Overview' },
    { path: '/tech-stack', icon: <Code2 size={20} />, label: 'Tech Stack' },
    { path: '/architecture', icon: <Layers size={20} />, label: 'Architecture' },
    { path: '/components', icon: <Boxes size={20} />, label: 'Components' },
    { path: '/workflows', icon: <GitBranch size={20} />, label: 'Workflows' },
    { path: '/deep-dives', icon: <FileCode size={20} />, label: 'Deep Dives' },
    { path: '/setup', icon: <Settings size={20} />, label: 'Setup Guide' },
  ];

  const baseLinkClasses = `
    flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200
    hover:bg-gray-100 dark:hover:bg-gray-700
  `;

  const activeLinkClasses = `
    bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400
  `;

  const inactiveLinkClasses = `
    text-gray-700 dark:text-gray-300
  `;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {metadata?.projectName || 'Codebase Docs'}
              </h2>
            </div>
            {metadata && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Generated on {formatDate(metadata.generationDate)}
              </p>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer stats */}
          {metadata && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Files:</span>
                  <span>{metadata.stats.totalFiles.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lines of code:</span>
                  <span>{metadata.stats.totalLinesOfCode.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Components:</span>
                  <span>{metadata.stats.componentsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Features:</span>
                  <span>{metadata.stats.featuresCount}</span>
                </div>
                {metadata.license && (
                  <div className="flex justify-between">
                    <span>License:</span>
                    <span>{metadata.license}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
