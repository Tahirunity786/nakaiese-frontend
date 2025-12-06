'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';


const TitleComponent = ({ title = '', type, SSID }) => {
    const router = useRouter();
    const locale = useLocale();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(`${locale}/property?type=${type}&SSID=${SSID}`);
    };

    return (
        <a
            onClick={handleClick}
            className="cursor-pointer text-base font-bold text-gray-800 no-underline transition-colors duration-200 hover:text-blue-600 truncate max-w-[17ch] block"
            title={title} // Tooltip to show full text on hover
        >
            {title || 'Untitled'}
        </a>
    );
};

export default TitleComponent;