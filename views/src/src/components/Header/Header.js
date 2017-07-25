import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = React.createClass({
  toggle() {
    let linksEl = document.querySelector('.narrow-links');
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
    } else {
      linksEl.style.display = 'block';
    }
  },
  render() {
    return <div className="nav">
      <div className="nav-wide">
        <Link to="/" className="logo">
          <span>HS</span>
        </Link>
        {/*<IndexLink to='/' className="wide-link" activeClassName='route--active'>*/}
          {/*Home*/}
        {/*</IndexLink>*/}
        {/*<Link to='/counter' className="wide-link" activeClassName='route--active'>*/}
          {/*Counter*/}
        {/*</Link>*/}
        <Link to='/code' className="wide-link" activeClassName='route--active'>
          Code
        </Link>
        <Link to='/about' className="wide-link" activeClassName='route--active'>
          About
        </Link>
      </div>
      <div className="nav-narrow">
        <i className="fa fa-bars fa-2x" onClick={this.toggle} />
        <div className="narrow-links">
          <div className="narrow-wrap" onClick={this.toggle}>
            <IndexLink to='/' className="narrow-link" activeClassName='route--active'>
              Home
            </IndexLink>
          </div>
          <div className="narrow-wrap" onClick={this.toggle}>
            <Link to='/counter' className="narrow-link" activeClassName='route--active'>
              Counter
            </Link>
          </div>
          <div className="narrow-wrap" onClick={this.toggle}>
            <Link to='/code' className="narrow-link" activeClassName='route--active'>
              Code
            </Link>
          </div>
          <div className="narrow-wrap" onClick={this.toggle}>
            <Link to='/about' className="narrow-link" activeClassName='route--active'>
              Code
            </Link>
          </div>
        </div>
      </div>
    </div>
  }
});

export default Header
