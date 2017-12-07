import React, { Component } from 'react'
import Post from './Post'
import { loadJs } from '../utils'

export default class PostList extends Component {

  componentWillMount() {
    this.props.fetchPosts()
    this.loadingWrap = new Modal({ type: 'loading', title: '请稍后' })
  }

  render() {
    const { loading, error, articleList } = this.props
    return <div>
      {
        articleList.map((item, key) => (
          <Post key={key} link={`/detail/${item._id}`} {...item} />
        ))
      }
      </div>
  } 
}
