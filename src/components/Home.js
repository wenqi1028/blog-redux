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
            <Link to="/user">{localStorage.nickname}</Link>
          </h2>
          <div className="divider"></div>
        </section>
        <PostList
          articleList = {this.props.articleList}
          fetchPosts = {this.props.fetchPosts}
        />
      </div>
    )
  }
}

export default connect(state => {
  return {
    articleList: state.posts.articleList
    }
  }, { fetchPosts }
)(Home) 