import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatDate, loadJs } from '../utils'
import post from '../styles/Post.css'


export default class Post extends Component {
    render() {
        return (
        <article className={post.item}>
            <h3 className={post.title}>
                <Link to={this.props.link} dangerouslySetInnerHTML={{__html: this.props.post_title}} data-tip="这是个标题"></Link>
            </h3>
           
            <div className={post.meta}>
                {
                    this.props.tags && this.props.tags != 'undefined'
                    ?
                    <span className={post.metaItem}>
                    {
                    this.props.tags.split(',').slice(0, -1).map(function(e, k) {
                        return (
                            <Link key={k} to={`/search/${e}`} className={post.tag} dangerouslySetInnerHTML={{__html: '#' + e}}></Link>
                        )
                    })
                    }
                    </span>
                    : void 0
                }
                <span className={post.metaItem}>
                    <time className={post.date}>{formatDate(this.props.post_date)}</time>
                </span>
                <span className={post.metaItem}>
                    <a href="javascript:;" className={post.author}>
                        <img src={this.props.user_docs[0] ? this.props.user_docs[0].avatar : '/upload/a1.png'} alt="作者"/>
                    </a>
                    <span>{this.props.user_docs[0] ? this.props.user_docs[0].nickname : 'q该该'}</span>
                </span>
            </div>
            <div className={post.desc} dangerouslySetInnerHTML={{__html: this.props.post_desc}}>
            </div>
        </article>
        )
    }
}
