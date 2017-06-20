import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  location : state.location
})
export const CoreLayout = ({ children }) => {
  let viewport = location.pathname === '/' ? "home__viewport" : "core-layout__viewport";
  return <div className='container text-center'>
    {location.pathname !== '/' && <Header />}
    <div className={viewport}>
      {children}
    </div>
  </div>
};

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default connect(mapStateToProps)(CoreLayout)
