import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import common from '../styles/Common.css'
import footer from '../styles/Footer.css'
import Header from '../components/Header'
import '../utils/iconfont.js'
import '../utils/modal.js'

class Main extends Component {
    scrollTop() {
        window.scrollTo(0, 0)
    }
    componentDidMount() {
        window.onscroll = function() {
            let back = document.getElementById('back')
            , scrollH = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollH >= 400) {
                back.style.display = 'block'
            } else {
                back.style.display = 'none'
            }
        }
    }
    render() {
        return (
            <div>
                <Header/>
                <main className={common.container}>
                    {this.props.children}
                </main>
                <a className={common.backTop} id="back" onClick={this.scrollTop}>
                    <img src="/img/backtop.png" alt=""/>
                </a>
                <footer className={common.container}>
                    {/* © Copyright 2017 Seven */}
                     <div className={footer.iconZone}>
                        <a href="https://github.com/wenqi1028/blog-redux" className={footer.iconPart} target="_blank">
                            <svg className={footer.icon} aria-hidden="true">
                                <use xlinkHref="#icon-github"></use>
                            </svg>
                        </a>
                        <a href="https://twitter.com/seven_waizui" className={footer.iconPart} target="_blank">
                            <svg className={footer.icon} aria-hidden="true">
                                <use xlinkHref="#icon-twitter"></use>
                            </svg>
                        </a>
                        <a href="http://weibo.com/u/1576108413" className={footer.iconPart} target="_blank"> 
                            <svg className={footer.icon} aria-hidden="true">
                                <use xlinkHref="#icon-weibo"></use>
                            </svg>
                        </a>
                        <a href="/feed" className={footer.iconPart} target="_blank">
                            <svg className={footer.icon} aria-hidden="true">
                                <use xlinkHref="#icon-feed"></use>
                            </svg>
                        </a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Main

