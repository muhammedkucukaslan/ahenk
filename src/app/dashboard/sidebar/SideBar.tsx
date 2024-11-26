'use client';

import React from 'react';
import useSidebarStore from './SideBarStore';

const SideBar = () => {
  const { isSideBarOpen } = useSidebarStore();

  return (
    <div
      className={`fixed left-0 top-0 h-full 
                    ${isSideBarOpen ? 'flex' : 'hidden'}
                    lg:flex
                    xl:flex
                    2xl:flex
                    `}
    >
      <h1>SideBar</h1>
    </div>
  );
};

export default SideBar;
