import React, {useEffect} from 'react'
import {withLocalize} from 'react-localize-redux'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Formik, Form} from 'formik'
import {object, string} from 'yup'

import regex from '@/utils/regex'
import {TYPES, actions} from '@/store/actions'
import Storage from '@/utils/storage'
import Request from '@/utils/request'

/** component */
import Input from '@/components/input'
import Button from '@/components/button'
import Field from '@/components/field'
import Notification from '@/components/notification'

/** asset */
import './style.scss'
import {useHistory} from "react-router-dom";

const validationSchema = object().shape({
    username: string().required().email().min(6)
        .max(100)
        .matches(regex.email, 'email'),
    password: string().required().min(6).max(40)
})


function Login(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const accountStore = useSelector(state => state.account)
    const onSubmit = (values) => {
        const {translate} = props
        dispatch(actions.login(values, (action, data, error) => {
            if (action === TYPES.LOGIN_SUCCESS) {
                Storage.set('ACCESS_TOKEN', data.token)
                Request.setAccessToken(`Bearer ${data.token}`)
                Notification.success(translate('success-messages.LOGIN_SUCCESS'))
                history.push("/");
            }
            if (action === TYPES.LOGIN_FAILURE) {
                if (error.code) {
                    Notification.error.bind(this)(error.code)
                }
            }
        }))
    }

    const renderForm = ({handleSubmit, ...form}) => {
        return (
            <Form className="form">
                <p className="title-page login-text">Login</p>
                <div className="field-group">
                    <Field
                        form={form}
                        name="username"
                        label="ID"
                        component={Input}
                    />
                    <Field
                        form={form}
                        name="password"
                        label="Password"
                        type="password"
                        component={Input}
                    />
                </div>
                <div className="action-box">
                    <Button
                        size="large"
                        htmlType="submit"
                        type="primary"
                        loading={!!accountStore.submitting}
                        disabled={!form.values.username || !form.values.password}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </div>
            </Form>
        )
    }

    const initialValues = {
        username: '',
        password: ''
    }
    return (
        <div className="login">
            <div className="form-login">
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    component={renderForm}
                />
            </div>
        </div>
    )
}

export default withLocalize(Login)
