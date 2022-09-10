import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink, useHistory} from 'react-router-dom'
import {withLocalize} from 'react-localize-redux'
import Icon from '@ant-design/icons';

import {actions} from '@/store/actions'
import Storage from '@/utils/storage'
import Request from '@/utils/request'

/** component */
import Flags from '@/components/flags'
import Notification from '@/components/notification'

/** asset */
import {Images} from '@/theme'
import './style.scss'

// @withLocalize
// @connect((state) => ({
//   uiStore: state.ui
// }), {
//   toggleSideBar: actions.toggleSideBar
// })

function Header(props) {
    const history = useHistory()
    const activeHome = () => {
        const allActive = document.querySelectorAll('.active')
        allActive.forEach((element) => element.classList.remove('active'))
        const subAll = document.querySelectorAll('.sub-menu')
        subAll.forEach((ele) => {
            if (ele) {
                ele.style.height = 0
            }
        })
    }

    const onLogout = () => {
        const {translate} = props
        Storage.remove('ACCESS_TOKEN')
        Request.removeAccessToken()
        history.push('/login')
        Notification.success(translate('success-messages.LOGOUT_SUCCESS'))
    }
    const {toggleSideBar, translate} = props
    return (
        <header>
            <NavLink
                exact
                to="/"
                className="menu-item"
                onClick={activeHome}
            >
                Logo
            </NavLink>
            <div className="header-right">
                <p className="menu-item link-login" onClick={onLogout}>
                    Logout
                </p>
                <div className="flags-login">
                    <Flags/>
                </div>
                <Icon type="menu" className="btn-menu-header" onClick={toggleSideBar}/>
            </div>
        </header>
    )
}

export default withLocalize(Header)
