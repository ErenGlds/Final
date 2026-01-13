import React from 'react';
import * as Lucide  from 'lucide-react';    
import {HelpCircle} from 'lucide-react';

function Icon ({
    name,
    size = 24,
    color = 'currentColor',
    className = '',
    strokeWidth = 2,
    ...props
})
{
    const IconComponent = LucideIcons?.[name];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found. Using HelpCircle as fallback.`);
        return <HelpCircle size={size} color={gray} className={className} strokeWidth={strokeWidth} {...props} />;
    }
    return 
        <IconComponent 
            size={size} 
            color={color} 
            className={className} 
            strokeWidth={strokeWidth} 
            {...props} 
        />;
}
export default Icon;