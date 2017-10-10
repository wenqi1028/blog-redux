import React, { Component } from 'react'
import Post from './Post'
import { loadJs } from '../utils'

export default class PostList extends Component {

  componentWillMount() {
    this.props.fetchPosts()
    this.loadingWrap = new Modal({ type: 'loading', title: '请稍后' })
  }

  // componentDidMount() {
  //   setTimeout(function() {
  //     loadJs("https://changyan.sohu.com/upload/plugins/plugins.list.count.js?clientId=cytb2bNdY",function(e){
  //     },'cy_cmt_num')
  //   }, 100);
  // }
  render() {
    const { loading, error, articleList } = this.props
    // if (loading) this.loadingWrap.show()
    // else this.loadingWrap.hide()
    return <div>
      {
        articleList.map((item, key) => (
          <Post key={key} link={`/detail/${item._id}`} {...item} />
        ))
      }
      </div>
  } 
}
