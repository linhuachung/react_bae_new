import React, {Component, Suspense, lazy, useEffect} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import setLocale from 'yup/lib/setLocale'
import {renderToStaticMarkup} from 'react-dom/server'
import Storage from '@/utils/storage'
import Request from '@/utils/request'
import {withLocalize} from 'react-localize-redux'

/** Languages */
import errorJP from '@/languages/error-messages/jp.json'
import errorEN from '@/languages/error-messages/en.json'
import EN from '@/languages/app/en.json'
import JP from '@/languages/app/jp.json'

/** Layout */
import NavBar from '@/app/nav-bar'
import Header from '@/app/header'
/** component */
import Loading from '@/components/loading'
import Page from '@/components/page'
import {initialize, addTranslation} from "react-localize-redux";

/** page */
const Login = lazy(() => import('@/pages/account/login'))
const Home = lazy(() => import('@/pages/home'))
const NotFound = lazy(() => import('@/pages/not-found'))

const PrivateRoute = ({condition, redirect, ...props}) => {
    condition = condition()
    if (condition) return <Route {...props} />
    return <Redirect to={redirect}/>
}

setLocale({
    mixed: {
        required: 'required'
    },
    string: {
        email: 'email',
        min: ({min}) => `min${min}`,
        max: ({max}) => `max${max}`,
        matches: ({matches, message}) => (message || matches || 'matches')
    }
})

function RoutesComponent(props) {
    // console.log(props)
    const {initialize, addTranslationForLanguage: add} = props
    useEffect(() => {
        if (Storage.get('LANGUAGE') === 'en') {
            initialize({
                languages: [{
                    name: 'English',
                    code: 'en'
                }, {
                    name: 'Japanese',
                    code: 'jp'
                }],
                options: {
                    renderToStaticMarkup
                }
            })
        }

        if (!Storage.has('LANGUAGE') || Storage.get('LANGUAGE') === 'jp') {
            initialize({
                languages: [{
                    name: 'Japanese',
                    code: 'jp'
                }, {
                    name: 'English',
                    code: 'en'
                }],
                options: {
                    renderToStaticMarkup
                }
            })
        }
        add(errorEN, 'en')
        add(errorJP, 'jp')
        add(EN, 'en')
        add(JP, 'jp')
    }, [])


    const token = Storage.get('ACCESS_TOKEN')
    if (token) {
        Request.setAccessToken(`Bearer ${token}`)
    }

    const renderLazyComponent = (LazyComponent, params) => (props) => <LazyComponent {...props} {...params} />

    const renderAuthRoutes = () => (
        <Suspense fallback={<Page className="page-loading"><Loading/></Page>}>
            <Header/>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={renderLazyComponent(Home)}/>
                <Route path="/not-found" component={renderLazyComponent(NotFound)}/>
            </Switch>
        </Suspense>
    )
    return (
        <BrowserRouter>
            <Suspense fallback={<Page><Loading/></Page>}>
                <Switch>
                    <Route exact path="/login" component={renderLazyComponent(Login)}/>
                    <Route path="/not-found" component={renderLazyComponent(NotFound)}/>
                    <PrivateRoute
                        condition={() => Storage.has('ACCESS_TOKEN')}
                        redirect="/login"
                        path="/"
                        component={renderAuthRoutes}
                    />
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

export default withLocalize(RoutesComponent)
