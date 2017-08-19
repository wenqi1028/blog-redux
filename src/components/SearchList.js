import React, { Component } from 'react'
import { fetchPosts } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Post from './Post'
import { tags } from '../utils'
import search from '../styles/Search.css'

class SearchList extends Component {
  componentDidMount() {
    scrollTo(0, 0)
    this.props.fetchPosts(this.props.match.params.tag) 
  }

  componentWillReceiveProps(nextProps) {
    const thisTag = this.props.match.params.tag
    const nextTag = nextProps.match.params.tag
    if (thisTag != nextTag) {
      this.props.fetchPosts(nextTag) 
    }
  }
  
  render() {
    const { loading, error, articleList, match } = this.props
    const tag = new RegExp(match.params.tag, 'gi')
    return (
      <div>
        <div className={search.tagPanel}>
          <div className={search.tagLeft}>类别：</div>
          <div className={search.tagRight}>
            {
              tags.split(',').slice(0, -1).map((item, key) => (
                <Link key={key} 
                  className={match.params.tag == item ? search.tagActive : search.tag} 
                  to={`/search/${item}`}>{item}
                </Link>
                )
              )
            }
          </div>
        </div>
        <div>
          {
            articleList.map((item, key) => {
              item.post_title = item.post_title.replace(tag, '<strong>$&</strong>')
              return (
                <Post key={key} link={`/detail/${item._id}`} {...item} />
              )}
            )
          }
        </div>
      </div>
    )
  } 
}

export default connect(state => {
    return {
        articleList: state.posts.articleList,
    }
  }, { fetchPosts }
)(SearchList)