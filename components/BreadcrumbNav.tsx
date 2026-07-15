import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface Props {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: Props) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 overflow-x-auto scrollbar-hide" aria-label="Breadcrumb">
      <button 
        onClick={items[0]?.onClick}
        className="flex items-center gap-1 hover:text-[#C49E30] transition-colors whitespace-nowrap"
      >
        <Home size={12} />
        <span>Início</span>
      </button>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight size={12} className="text-gray-600 flex-shrink-0" />
          {item.onClick ? (
            <button 
              onClick={item.onClick}
              className="hover:text-[#C49E30] transition-colors whitespace-nowrap"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-[#C49E30] whitespace-nowrap font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
