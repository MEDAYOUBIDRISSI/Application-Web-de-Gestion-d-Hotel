import React, { Component } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';

class Header extends Component {

    state = {
        books: [],
      }


    componentWillMount() {
        this._refreshBooks();
      }
    _refreshBooks() {
        axios.get('http://localhost:8000/api/header').then((response) => {
          console.log(response.data)
        this.setState({
          books: response.data
        })
        });
      }

    render(){ 

        let books = this.state.books.map((book) => {
            return (
                <div class="widget-content-wrapper">
                <div class="widget-content-left">
                    <div class="btn-group">
                        <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="p-0 btn">
                            <img class="rounded-circle" src={book.url} alt="" width="42"/>
                        </a>
                    </div>
                </div>
                <div class="widget-content-left  ml-3 header-user-info">
                    <div class="widget-heading">
                        {book.nom} {book.prenom}
                    </div>
                    {/* <div class="widget-subheading">
                        {book.dtype}
                    </div> */}
                </div>
                <div class="widget-content-right header-user-info ml-3">
                    <button type="button" class="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
                        <i class="fa text-white fa-calendar pr-1 pl-1"></i>
                    </button>
                </div>
            </div>
            )
            });

    return (
        <div class="app-header header-shadow">
            <div class="app-header__logo">
                <div class="logo-src"></div>
                <div class="header__pane ml-auto">
                    <div>
                        <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="app-header__mobile-menu">
                <div>
                    <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="app-header__menu">
                <span>
                    <button type="button" class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span class="btn-icon-wrapper">
                            <i class="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>    <div class="app-header__content">
                <div class="app-header-left">
                    <div class="search-wrapper"> 
                        <div class="input-holder">
                            <input type="text" class="search-input" placeholder="Type to search"/>
                            <button class="search-icon"><span></span></button>
                        </div>
                        <button class="close"></button>
                    </div>
                    <ul class="header-menu nav">
                        <li class="nav-item">
                            <Link to={"/index"} class="nav-link">
                                <i class="nav-link-icon fa fa-database"> </i>
                                Index
                            </Link>
                        </li>
                        <li class="btn-group nav-item">
                            <Link to={"/login"} class="nav-link">
                                <i class="nav-link-icon fa fa-user-times"></i>
                                Logout
                            </Link>
                        </li>
                        {/* <li class="dropdown nav-item">
                            <a href="javascript:void(0);" class="nav-link">
                                <i class="nav-link-icon fa fa-cog"></i>
                                Settings
                            </a>
                        </li> */}
                    </ul>        
                </div>
                <div class="app-header-right">
                    <div class="header-btn-lg pr-0">
                        <div class="widget-content p-0">
                            {books}
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    )
}
}
export default Header;
