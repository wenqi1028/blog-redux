import React, { Component } from 'react'
import Post from './Post'
import { loadJs } from '../utils'

export default class PostList extends Component {
  componentWillMount() {
    this.props.fetchPosts() 
  }

  componentDidMount() {
    setTimeout(function() {
      loadJs("https://changyan.sohu.com/upload/plugins/plugins.list.count.js?clientId=cytb2bNdY",function(e){

      },'cy_cmt_num')
    }, 100);

  }

  render() {
    const { loading, error, articleList } = this.props
    if (error) {
      return <p className="message">Oops, something is wrong.</p>
    }
    if (loading) {
      return <p className="message">Loading...</p>
    }
    return <div>
      {
        articleList.map((item, key) => (
          <Post key={key} link={`/detail/${item._id}`} {...item} />
        ))
      }
      </div>
  } 
}
