'use client';

import React from 'react';
import useSidebarStore from './SideBarStore';

const SideBar = () => {
  const { isSideBarOpen } = useSidebarStore();

  return (
    <div
      className={`h-full 
                    ${isSideBarOpen ? 'flex' : 'hidden'}
                    lg:flex
                    xl:flex
                    2xl:flex
                    w-72 border-r p-4
                    `}
    >
      <h1>SideBar</h1>
    </div>
  );
};

export default SideBar;
