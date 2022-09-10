import React from 'react'
import classNames from 'classnames'
import { withLocalize } from 'react-localize-redux'
import lodash from 'lodash'
import { Field } from 'formik'

import './style.scss'

export default withLocalize(({
  component: Component,
  translate,
  form,
  name,
  value,
  label,
  error,
  require,
  note,
  inline,
  type,
  ...props
}) => {
  if (value === '' || value) {
    form.values[name] = value
  }

  if (form.values[name] && /^\s+$/.test(form.values[name])) {
    form.values[name] = null
  }

  if (type === 'password') {
    form.values[name] = form.values[name] && form.values[name].replace(' ', '')
  }

  props = lodash.omit(props, [
    'activeLanguage',
    'addTranslation',
    'addTranslationForLanguage',
    'defaultLanguage',
    'ignoreTranslateChildren',
    'initialize',
    'languages',
    'setActiveLanguage',
    'renderToStaticMarkup'
  ])
  return (
    <div className={classNames('field', { inline })}>
      {label && (
        <p className="label">
          {label}
          {require && <span style={{ color: 'red' }}>*</span>}
          {note && <span className="note-label">{note}</span>}
        </p>
      )}
      <div className="field-content">
        <Field {...props} name={name} component={Component} type={type} />
        <p className="error-message">{form && form.errors[name] && form.values[name] !== null ? translate(`validation.${form.errors[name]}`) : error && translate(`validation.${error}`)}</p>
      </div>
    </div>
  )
})
