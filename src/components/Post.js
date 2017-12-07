import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatDate, loadJs } from '../utils'
import post from '../styles/Post.css'

export default class Post extends Component {
    render() {
        return (
            <article className={post.item}>
                <Link className={post.title} to={this.props.link} dangerouslySetInnerHTML={{ __html: this.props.post_title }} data-tip="这是个标题"></Link>

                <div className={post.meta} style="float:right">
                    <span className={post.metaItem}>
                        <time className={post.date}>{formatDate(this.props.post_date)}</time>
                    </span>
                </div>
            </article>
        )
    }
}
