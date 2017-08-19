import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { renderField } from './renderField'
import { login } from '../actions'
import common from '../styles/Common.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }
  login(props) {
    this.props.login(props)
  }
  componentDidUpdate() {
    if (this.props.user.hasOwnProperty('username')) {
      Object.assign(localStorage, this.props.user)
      this.props.history.push('/')
    } 
  }
  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <form method="post" onSubmit={handleSubmit(this.login.bind(this))}>
          <Field name="username" divClassName={common.formGroup} className={common.formControl} component={renderField} type="text" label="用户名" />
          <Field name="password" divClassName={common.formGroup} className={common.formControl} component={renderField} type="password" label="密码" />
          <div className={common.formGroup}>
            <input type="submit" className={common.btnPrimary} value="登录"/>
          </div>
        </form>
      </div>
    );
  }
}

Login = reduxForm({
  form: 'Login',
})(Login)

export default withRouter(connect(state => {
    return {
      user: state.user,
      enableReinitialize : true,
    }
  }, { login }
)(Login))

