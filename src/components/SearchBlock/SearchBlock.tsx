import React, { useState } from 'react';
import './SearchBlock.scss';

interface SearchBlockProps {
    items: string[];
}

const SearchBlock: React.FC<SearchBlockProps> = ({ items }) => {
    const [searchText, setSearchText] = useState('');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setActiveIndex(null);
    };

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="search-block">
            <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Поиск..."
            />
            <ul>
                {items
                    .filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
                    .map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleItemClick(index)}
                        >
                            <span className={index === activeIndex ? 'active' : ''}>{index + 1}</span>
                            <span>{item}</span>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default SearchBlock;
