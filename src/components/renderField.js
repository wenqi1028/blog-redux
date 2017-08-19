import React, { Component } from 'react';

export const renderField = ({ input, divClassName, className, label, type, meta: { touched, error, warning } }) => {
  return (
    <div className={divClassName}>
      <div>
        <input {...input} className={className} placeholder={label} type={type} autoComplete="off" />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}

export const renderTextArea = ({ input, divClassName, className, label, meta: { touched, error, warning } }) => (
  <div className={divClassName}>
    <div>
      <textarea {...input} placeholder={label} className={className}></textarea>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)