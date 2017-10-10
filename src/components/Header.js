import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchSearch, toggleSearch } from '../actions'
import classNames from 'classnames'
import header from '../styles/Header.css'
import search from '../styles/Search.css'

class Header extends Component {

	 logout() {
		localStorage.clear()
		this.props.history.push('/')
	}

	onSearch(q) {
		this.props.toggleSearch(true)
		if (q.target.value) {
			this.props.fetchSearch(q.target.value)
		}
	}

	onBlur(q) {
		setTimeout(function() {
			this.props.toggleSearch(false)
		}.bind(this), 500)
	}

	onFocus(q) {
		this.props.toggleSearch(q.target.value)
	}

	render() {
		const { isSearchActive, searchList } = this.props
		const panel = classNames({
			searchPanelActive: isSearchActive && searchList.length > 0,
			searchPanel: searchList.length == 0 || (searchList.length > 0 && !isSearchActive) ,
		})
		return (
			<header className={header.header}>
				<div className={header.left}>
					<a className={header.title} href="/">
							首页
					</a>
					{  localStorage.hasOwnProperty('auth')
					? 
					<span>
							<Link className={header.title} to={`/create`}>
							创建
							</Link>
							<a className={header.title} onClick={this.logout.bind(this)} href="javascript:;">
							登出
							</a>
					</span>
					:
							void 0
					}
				</div>
				<div className={search.zoneRight}>
					<svg viewBox="0 0 16 16" className={search.icon} aria-hidden="true">
						<title></title>
						<g>
							<path d="M12.054 10.864c.887-1.14 1.42-2.57 1.42-4.127C13.474 3.017 10.457 0 6.737 0S0 3.016 0 6.737c0 3.72 3.016 6.737 6.737 6.737 1.556 0 2.985-.533 4.127-1.42l3.103 3.104c.765.46 1.705-.37 1.19-1.19l-3.103-3.104zm-5.317.925c-2.786 0-5.053-2.267-5.053-5.053S3.95 1.684 6.737 1.684 11.79 3.95 11.79 6.737 9.522 11.79 6.736 11.79z">
							</path>
						</g>
					</svg>

					<Field name="keyword" component="input" type="text" className={search.input} onChange={this.onSearch.bind(this)} onBlur={this.onBlur.bind(this)} onFocus={this.onFocus.bind(this)} placeholder="输入关键字搜索" autoComplete="off" />

					<div className={search[panel]}>
						<ul>
							{
								this.props.searchList ?
								this.props.searchList.map((item, key) => {
									return (
										<li key={key}>
											<a href={`/detail/${item._id}`} target="_blank">
												{item.post_title}
											</a>
										</li>
									)
								}) :
								<li><a>没有找到</a></li>
							}
						</ul>
					</div>
				</div>
			</header>
		)
	}
}

Header = reduxForm({
  form: 'Header',
})(Header)

export default withRouter(connect(state => {
		return {
			searchList: state.posts.searchList,
			isSearchActive: state.posts.isSearchActive
		}
  }, { fetchSearch, toggleSearch }
)(Header))