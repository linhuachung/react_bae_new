import React from 'react'
import { Input } from 'antd'
import classNames from 'classnames'
import 'antd/es/input/style/css'
import './style.scss'

export default ({ field, form, modern, simple, className, ...props }) => (
  <Input
    {...field}
    {...props}
    className={classNames(className, { modern, simple })}
  />
)
