import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../components/Home'
import Login from '../components/Login'
import UserForm from '../components/UserForm'
import PostDetail from '../components/PostDetail'
import PostForm from '../components/PostForm'
import SearchList from '../components/SearchList'
import { formatAuth } from '../utils'

const routes = (
 <BrowserRouter>
    <Main> 
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/user/" component={UserForm} />
        <Route path="/detail/:postid" component={PostDetail} />
        <Route path="/update/:postid" render={() => (
            formatAuth(localStorage.auth).post < 2 ? <Login /> : <PostForm />
            )}
        />
        <Route path="/create" render={() => (
            formatAuth(localStorage.auth).post < 2 ? <Login /> : <PostForm />
            )}
        />
        <Route path="/search/:tag" component={SearchList} />
    </Main>
 </BrowserRouter>
)

export default routes