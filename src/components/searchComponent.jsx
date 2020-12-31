import useSearchStyles from '../styles/searchStyles'
import { Search as SearchIcon } from '@material-ui/icons';
import { InputBase } from '@material-ui/core'
import React from 'react';
const SearchBar = ({ placeholder, value, onChange }) => {

    const searchClasses = useSearchStyles();
    return (
        <div className={searchClasses.search}>
            <div className={searchClasses.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search Name"
                classes={{
                    root: searchClasses.inputRoot,
                    input: searchClasses.inputInput,
                }}
                value={value}
                onChange={onChange}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    )

}

export default SearchBar;