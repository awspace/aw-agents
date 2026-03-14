import React from 'react';

interface SectionPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const SectionPage: React.FC<SectionPageProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`max-w-5xl mx-auto ${className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
        {description && (
          <p className="text-lg text-gray-600 dark:text-gray-300">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default SectionPage;
