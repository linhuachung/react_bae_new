import React from 'react'
import { Button } from 'antd'
import 'antd/es/button/style/css'
import './style.scss'

export default ({ children, ...props }) => (
  <Button {...props}>{children}</Button>
)
