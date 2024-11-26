import { SearchIcon } from 'lucide-react';
import React from 'react';

const Search = () => {
  return (
    <div className='border rounded-lg bg-secondary flex px-3 py-1 items-center w-[275px]'>
      <SearchIcon size={20} className='text-secondary-foreground' />
      <input
        type='text'
        className='bg-transparent border-none shadow-none flex-1 px-2 py-1 outline-none'
        placeholder="Ahenk'te ara..."
      />
    </div>
  );
};

export default Search;
