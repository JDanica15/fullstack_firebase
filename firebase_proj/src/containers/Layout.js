import React from 'react'
import LeftSideBar from './LeftSideBar'
import PageContent from './PageContent'

const Layout = () => {
  return (
    <div className='drawer lg:drawer-open'>
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <PageContent />
        <LeftSideBar />
    </div>
  )
}

export default Layout