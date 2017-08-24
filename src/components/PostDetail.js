import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions'
import { Link } from 'react-router-dom'
import { formatDate, loadJs } from '../utils'
import common from '../styles/Common.css'
import detail from '../styles/PostDetail.css'
import post from '../styles/Post.css'
import '../styles/lib/atelier-forest-light.css'
import '../utils/medium-zoom.min.js'

class PostDetail extends Component {
    constructor(props) {
        super(props)
        this.delete = () => {
            if (confirm('确定要删除该文章？')) 
                this.props.deletePost(this.props.match.params.postid)
            this.props.history.push('/')
        }
    }
    componentWillMount() {
        scrollTo(0, 0)
        this.props.fetchPost(this.props.match.params.postid)
    }
    componentDidUpdate() {
        document.title = this.props.article.post_title
        hljs.initHighlighting();
        mediumZoom('main img');
        // 畅言评论
        document.querySelector('#SOHUCS').setAttribute('sid', this.props.article._id)
            var appid = 'cytb2bNdY'; 
            var conf = 'prod_83a750ef3fef7a11a324dbddca77e7c4'; 
            var width = window.innerWidth || document.documentElement.clientWidth; 
            loadJs("http://changyan.sohu.com/upload/changyan.js",function(){window.changyan.api.config({appid:appid,conf:conf})}); 
        
    }
    render() {
        const { article } = this.props
        return (
            <div className={detail.container}>
                <div className={detail.header}>
                    <h1 className={detail.title}>{article.post_title}</h1>
                    <div className={detail.meta}>
                        <span className={post.metaItem}>
                            <time className={post.date}>{formatDate(article.post_date)}</time>
                        </span>
                        <span className={post.metaItem}>
                            <a href="javascript:;" className={post.author}>
                                <img src={article.user_docs[0] ? article.user_docs[0].avatar : '/upload/a1.png'} alt="作者"/>
                            </a>
                            <span>{article.user_docs[0] ? article.user_docs[0].nickname : 'q该该'}</span>
                        </span>
                    </div>
                    {
                        article.post_desc 
                        ? 
                        <div className={detail.desc}>{article.post_desc}</div>
                        : void 0
                    }
                </div>
                <div className={detail.content} dangerouslySetInnerHTML={{__html: (article.post_content)}}>
                </div>
                {
                    localStorage.uid == article.uid ?
                    <div>
                        <Link className={common.btnPrimary} to={`/update/${article._id}`}>修改</Link>
                        <a className={common.btnSecondary}  onClick={this.delete}>删除</a> 
                    </div>
                    : void 0 
                }
                <div id="SOHUCS">正在加载评论...</div> 
            </div>
        );
    }
}

export default connect(state => {
    return {
        article: state.posts.article
        }
    }, { fetchPost, deletePost })
(PostDetail)
