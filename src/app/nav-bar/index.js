import React, {Component} from 'react'
import {connect, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {withLocalize} from 'react-localize-redux'

/** asset */
import HomeIcon from '@/resources/images/icon/home.png'
import './style.scss'

// @connect((state) => ({
//     uiStore: state.ui
// }), {})

function Navbar(props) {
    const {translate} = props
    const uiStore = useSelector(state => state.ui)
    const menuItem = [{
        link: '/',
        name: `${translate('app.Home')}`,
        icon: HomeIcon
    }]
    return (
        <nav className={uiStore.isSideBarOpen ? 'open' : ''}>
            {
                menuItem.length > 0 && menuItem.map((item, index) => (
                    <NavLink
                        exact
                        key={index}
                        to={item.link}
                        className="menu-item"
                        // onClick={this.openToggleSub}
                    >
                        <span><img src={item.icon} alt="icon menu" width="20px" height="auto"
                                   style={{marginRight: 15}}/>{item.name}</span>
                    </NavLink>
                ))
            }
        </nav>
    )
}

export default withLocalize(Navbar)
