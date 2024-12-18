import { useState } from 'react';

function SearchBar({ placeholder, onSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    const styles = {
        searchBar: {
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '5px 10px',
            maxWidth: '300px',
            backgroundColor: '#f9f9f9',
            position: 'relative',
            top: '-10px'
        },
        searchInput: {
            flex: 1,
            border: 'none',
            outline: 'none',
            padding: '5px',
            fontSize: '16px',
            backgroundColor: 'transparent',
        },
        searchIcon: {
            fontSize: '18px',
            color: '#888',
            marginRight: '8px',
        },
    };

    return (
        <div style={styles.searchBar}>
            <span style={styles.searchIcon}>🔍</span>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder || 'Rechercher...'}
                style={styles.searchInput}
            />
        </div>
    );
}

export default SearchBar;
