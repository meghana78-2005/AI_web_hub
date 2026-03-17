import { Category } from '../types/database';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onClick: (slug: string) => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const IconComponent = (Icons[category.icon as keyof typeof Icons] as React.ElementType) || Icons.Folder;

  return (
    <button
      onClick={() => onClick(category.slug)}
      className="group w-full p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {category.description}
          </p>
        </div>
      </div>
    </button>
  );
}
