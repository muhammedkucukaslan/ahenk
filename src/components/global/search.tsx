import { SearchIcon } from 'lucide-react';
import React from 'react';

const Search = () => {
  return (
    <div className='border hidden rounded-lg bg-secondary/50 md:flex px-3 py-1 items-center w-[320px]'>
      <SearchIcon size={20} className='text-muted-foreground' />
      <input
        type='text'
        className='bg-transparent border-none shadow-none flex-1 px-2 py-1 outline-none'
        placeholder="Ahenk'te ara..."
      />
    </div>
  );
};

export default Search;
