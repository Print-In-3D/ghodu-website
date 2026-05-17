import React from 'react';
import * as LucideIcons from 'lucide-react';

const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
    const LucideIcon = LucideIcons[name];

    if (!LucideIcon) {
        console.warn(`Icon "${name}" not found in lucide-react`);
        return <LucideIcons.HelpCircle size={size} color={color} className={className} />;
    }

    return <LucideIcon size={size} color={color} className={className} />;
};

export default Icon;
