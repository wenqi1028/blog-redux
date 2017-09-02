import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { clearPost, fetchPost, updatePost, createPost } from '../actions'
import { renderTextArea, renderField } from './renderField'
import { target, tags } from '../utils'
import '../styles/lib/simditor.css'
import common from '../styles/Common.css'
import post from '../styles/Post.css'

function validate(values) {
  const errors = {}
  if (!values.post_title) {
    errors.post_title = 'Required'
  }
  return errors
}

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.isNew = /^\/create/.test(this.props.match.path)
    this.onTagChange = this.onTagChange.bind(this)
  }
  
  componentWillMount() {
    scrollTo(0, 0)
    if (!this.isNew) {
        this.props.fetchPost(this.props.match.params.postid)
    }
    else this.props.clearPost()
  }

  componentDidMount() {
    var editor = new Simditor({
      textarea: $('textarea'),
      toolbar : [ 'title', 'bold', 'italic', 'underline', 'fontScale', 'color', 'ol', 'ul', 'blockquote', 'code', 'link', 'image', 'hr',],  //工具栏
      upload : {
        url : target + 'upload', //文件上传的接口地址
        params: {name: 'file'}, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
      } 
    })
    // 验证是否本人，文章内容初始化
    setTimeout(function() {
      if (this.props.article.uid != localStorage.uid) 
        this.props.history.push('/')
      editor.setValue(this.props.article.post_content || '')
    }.bind(this), 1000)
    
    editor.on('valuechanged', function(e) {
      this.props.change('post_content', editor.getValue())
    }.bind(this))
  }

  onSubmit(props) {
    const path = this.props.match.params.postid ? `/detail/${this.props.match.params.postid}` : `/`
    if (!this.isNew) this.props.updatePost(props)
    else this.props.createPost(props)
    this.props.history.push(path)
  }
  
  onTagChange(e) {
    let tags = document.getElementsByName('tags')[0].value || ''
    let tag  = e.target.innerText
    let style = e.target.style
    if (tags.indexOf(tag) >= 0) {
      tags = tags.replace(`${tag},`, '')
      style.background = '#eee'
      style.color = '#666'
    } else {
      tags += `${tag},`
      style.background = '#14c8e4'
      style.color = '#fff'
    }
    this.props.change('tags', tags)
  }

  render() {
    const { handleSubmit, pristine, submitting, createPost} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="_id" component={renderField} type="hidden" />

          <Field name="uid" component={renderField} type="hidden" />

          <Field name="post_title" divClassName={common.formGroup} className={common.formControl} component={renderField} type="text" label="标题" />

          <Field name="post_desc" divClassName={common.formGroup} className={common.formControl} component={renderField} type="text" label="简介" />

          <Field name="tags" className={common.checkboxInline} component={renderField} type="hidden" label="标签" />
          
          <div className={common.formGroup}>
          {
            tags.split(',').slice(0, -1).map((value, index) => {
              return (
                <span 
                  key={index} 
                  onClick={this.onTagChange} 
                  className={(this.props.article.tags || '').indexOf(value) >= 0 ? post.chkboxActive : post.chkbox}>
                  {value}
                </span>
              )
            })
          } 
          </div>
            
          <Field name="post_content" divClassName={common.formGroup} className={common.formControl} component={renderTextArea} label="内容"/>  

          <div className={common.formGroup}>
            <button className={common.btnPrimary} disabled={pristine || submitting}>确定</button>
            <Link className={common.btnSecondary} to="/">返回</Link>
          </div>
        </form>
      </div>
    )
  }
}

PostForm = reduxForm({
  form: 'PostForm',
})(PostForm)

export default withRouter(connect(state => {
    return {
        article: state.posts.article,
        initialValues: state.posts.article,
        enableReinitialize : true,
        keepDirtyOnReinitialize: true
    }
  }, { clearPost, fetchPost, updatePost, createPost }
)(PostForm))