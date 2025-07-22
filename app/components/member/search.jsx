import { useState } from 'react'

const SearchBarTitle = ({ data, onSearch }) => {
    const [query, setQuery] = useState('')

    const handleInputChange = (event) => {
        const inputValue = event.target.value
        setQuery(inputValue)
        onSearch(inputValue)
    }

    return (
        <div className='search-bar p-2'>
            <input
              type='text'
              placeholder='Title'
              value={query}
              onChange={handleInputChange}
              className="border"
            />
        </div>
    )
}

export default SearchBarTitle
