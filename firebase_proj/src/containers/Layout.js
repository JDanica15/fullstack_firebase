import React, { Fragment } from 'react'
import LeftSideBar from './LeftSideBar'
import PageContent from './PageContent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <Fragment>

      <div className='drawer lg:drawer-open'>
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <PageContent />
        <LeftSideBar />
      </div>

      {/* NOTIFICATION CONTAINER */}
      <ToastContainer />
    </Fragment>
  )
}

export default Layout