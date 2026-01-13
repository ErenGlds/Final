import React from 'react';
import * as LucideIcons from 'lucide-react';

const Icon = ({ name, size = 24, color = 'currentColor', className = '', strokeWidth = 2, ...props }) => {
  const IconComponent = LucideIcons?.[name];
  if (!IconComponent) {
    const Fallback = LucideIcons?.HelpCircle ?? (() => null);
    console.warn(`Icon "${name}" not found. Using HelpCircle as fallback.`);
    return <Fallback size={size} color={color} className={className} strokeWidth={strokeWidth} {...props} />;
  }
  return <IconComponent size={size} color={color} className={className} strokeWidth={strokeWidth} {...props} />;
};

export default Icon;