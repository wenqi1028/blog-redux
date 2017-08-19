import React, { Component } from 'react'
import Post from './Post'

export default class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts() 
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
