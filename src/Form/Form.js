import React from 'react';

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}
