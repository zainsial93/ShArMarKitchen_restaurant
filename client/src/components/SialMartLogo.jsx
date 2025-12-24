import React from 'react';

const SialMartLogo = ({ size = 30 }) => (
    <svg width={size * 6} height={size} viewBox="0 0 300 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Icon: Chef Hat / Kitchen element */}
        <path d="M15 25C15 15 20 10 30 10C35 10 38 15 40 15C42 15 45 10 50 10C60 10 65 15 65 25V35H15V25Z" fill="#F59E0B" />
        <rect x="15" y="32" width="50" height="6" fill="#F8FAFC" />

        {/* Text: ShArMar Kitchen */}
        <text x="80" y="35" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="24" fill="#F8FAFC">
            Sial <tspan fill="#F59E0B">Foodies</tspan>
        </text>
    </svg>
);

export default SialMartLogo;
