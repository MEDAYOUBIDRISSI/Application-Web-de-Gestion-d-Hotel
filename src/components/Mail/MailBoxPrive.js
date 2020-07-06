import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar';
import Footer from './../MasterPage/Footer';


class MailBoxPrive extends Component {

    state = {
        users: [],
        books: [],
        newBookData: {
            etat: '',
            user_id: '',
        },
        editBookData: {
        id: '',
        etat: '',
        user_id: ''
        },
        newBookModal: false,
        editBookModal: false
      }
      componentWillMount() {
        this._refreshBooks();
        this._refreshBooks_2();
      }
      toggleNewBookModal() {
        this.setState({
          newBookModal: ! this.state.newBookModal
        });
      }
      toggleEditBookModal() {
        this.setState({
          editBookModal: ! this.state.editBookModal
        });
      }
      addBook() {
        axios.post('http://localhost:8000/api/message/prive/', this.state.newBookData).then((response) => {
          let { books } = this.state;
    
          books.push(response.data);
          this._refreshBooks();
          this.setState({ books, newBookModal: false, newBookData: {
            etat: '',
            user_id: '',
          }});
        });
      }
      deleteBook(id) {
        axios.delete('http://localhost:8000/api/message/prive/' + id).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:8000/api/message/prive').then((response) => {
        this.setState({
          books: response.data
        })
        });
      }

      _refreshBooks_2() {
        axios.get('http://localhost:8000/api/message/user_prive').then((response) => {
        this.setState({
          users: response.data
        })
        });
      }

    render(){ 

        let users = this.state.users.map((user) => {
            return (
                <div>
                    <div class="avatar-icon-wrapper mr-2">
                        <div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"></div>
                        <div class="avatar-icon avatar-icon-xl rounded"><img src={user.url} alt="" width="82"/></div>
                    </div>
                    <h4 class="mb-0 text-nowrap">{user.nom} {user.prenom}
                        <div class="opacity-7">Email: <span class="opacity-8">{user.username}</span></div>
                    </h4>
                </div>
            )
            });

        let books = this.state.books.map((book) => {
            return (
                <div>
                    {book.frid == 5?<div class="chat-box-wrapper">
                        <div>
                            <div class="avatar-icon-wrapper mr-1">
                                <div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"></div>
                                <div class="avatar-icon avatar-icon-lg rounded">
                                    <img src={book.frurl} alt=""/></div>
                            </div>
                        </div>
                        <div>
                            <div class="chat-box">{book.etat}.</div>
                            <small class="opacity-6">
                                <i class="fa fa-calendar-alt mr-1"></i>
                                {book.created_atmesage}
                            </small>
                        </div>
                    </div>: null }
                    {book.frid != 5?<div class="float-right">
                        <div class="chat-box-wrapper chat-box-wrapper-right">
                            <div>
                                <div class="chat-box">{book.etat}.</div>
                                <small class="opacity-6">
                                    <i class="fa fa-calendar-alt mr-1"></i>
                                    {book.created_atmesage}
                                </small>
                            </div>
                            <div>
                                <div class="avatar-icon-wrapper ml-1">
                                    <div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"></div>
                                    <div class="avatar-icon avatar-icon-lg rounded"><img src={book.frurl} alt=""/></div>
                                </div>
                            </div>
                        </div>
                    </div>: null }
                </div>
            )
            });

    return (
    <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
        <Header/>
            <div class="app-main">
                <LeftBar/>
                <div class="app-main__outer">
                    <div class="app-main__inner">
                        <div class="app-inner-layout chat-layout">
                            <div class="app-inner-layout__wrapper">
                                <div class="app-inner-layout__content card">
                                    <div class="table-responsive">
                                        <div class="app-inner-layout__top-pane">
                                            <div class="pane-left">
                                                <div class="mobile-app-menu-btn">
                                                    <button type="button" class="hamburger hamburger--elastic">
                                                <span class="hamburger-box">
                                                    <span class="hamburger-inner"></span>
                                                </span>
                                                    </button>
                                                </div>
                                                
                                                {users}
                                            </div>
                                        </div>
                                        <div class="chat-wrapper">
                                            {books}
                                        </div>
                                    </div>
                                    <div class="app-inner-layout__bottom-pane d-block text-center">
                                        <div class="mb-0 position-relative row form-group">
                                            <div class="col-sm-12">
                                                <input placeholder="Write here and hit enter to send..." type="text" class="form-control-lg form-control" id="etat" value={this.state.newBookData.etat} onChange={(e) => {
                                                let { newBookData } = this.state;

                                                newBookData.etat = e.target.value;

                                                this.setState({ newBookData });
                                            }}/>
                                                <button type="button" aria-haspopup="true" aria-expanded="false" class="btn-shadow btn btn-info form-control-lg form-control" onClick={this.addBook.bind(this)}>
                                                    <span class="btn-icon-wrapper pr-2 opacity-7">
                                                        {/* <i class="fa fa-business-time fa-w-20"></i> */}
                                                    </span>
                                                    Send
                                                </button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
    </div>
    )}
}
export default MailBoxPrive;
