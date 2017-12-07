import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PostList from './PostList'
import { fetchPosts } from '../actions'
import home from '../styles/Home.css'

class Home extends Component {
  render() { 
    return (
      <div>
        <section className={home.intro}>
          <img className={home.myImg} src={localStorage.avatar || '/upload/a1.png'} />
          <h2 className={home.myName}>
            {localStorage.nickname || 'Seven'}
          </h2>
          <div className="divider"></div>
        </section>
        <PostList
          articleList = {this.props.articleList}
          fetchPosts = {this.props.fetchPosts}
          loading = {this.props.loading}
        />
      </div>
    )
  }
}

export default connect(state => {
  return {
    articleList: state.posts.articleList,
    loading: state.posts.loading
    }
  }, { fetchPosts }
)(Home) 