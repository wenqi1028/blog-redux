import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { fetchUser, uploadavatar, updateUser } from '../actions'
import { renderTextArea, renderField } from './renderField'
import common from '../styles/Common.css'
import home from '../styles/Home.css'
import user from '../styles/User.css'

function validate(values) {
  const errors = {}
  if (!values.post_title) {
    errors.post_title = 'Required'
  }
  return errors
}

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.upload = this.upload.bind(this)
  }

  componentWillMount() {
    scrollTo(0, 0)
    this.props.fetchUser(localStorage.uid)
  }

  changeAvatar() {
    document.getElementById('avatarFile').click()
  }

  upload(e) {
    const file = e.target.files[0]
    if (file == null) {
        return;
    }
    this.props.uploadavatar(file)
  }

  onSubmit(props) {
    this.props.updateUser(props)
    this.props.history.push('/')
  }
  
  render() {
    const { handleSubmit, pristine, submitting, createPost} = this.props
    return (
      <div>
        <div className={home.intro}>
          <div className={user.avatar} onClick={this.changeAvatar}>
            <img name="avatar" src={this.props.user.avatar} alt="头像"/>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <input ref="avatarFile" id="avatarFile" type="file" onChange={this.upload} style={{display:'none'}} />

          <Field name="avatar" component={renderField} type="hidden" label="头像" />

          <Field name="nickname" divClassName={common.formGroup} className={common.formControl} component={renderField} type="text" label="昵称" />

          <div className={common.formGroup}>
            <button className={common.btnPrimary} disabled={submitting}>确定</button>
            <Link className={common.btnSecondary} to="/">返回</Link>
          </div>
        </form>
      </div>
    )
  }
}

UserForm = reduxForm({
  form: 'UserForm',
})(UserForm)

export default connect(state => {
    return {
      user: state.user,
      initialValues: state.user,
      enableReinitialize : true,
    }
  }, { fetchUser, uploadavatar, updateUser }
)(UserForm)