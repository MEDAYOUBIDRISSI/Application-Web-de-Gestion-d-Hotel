import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar'; 
import Footer from './../MasterPage/Footer';


class MailBox extends Component {

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
        axios.post('http://localhost:8000/api/message/', this.state.newBookData).then((response) => {
          let { books } = this.state;
    
          books.push(response.data);
          this._refreshBooks();
          this.setState({ books, newBookModal: false, newBookData: {
            etat: '',
            user_id: '',
          }});
        });
      }
      updateBook() {
        let { etat, user_id } = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/message/' + this.state.editBookData.id, {
            etat, user_id
        }).then((response) => {
          this._refreshBooks();
    
          this.setState({
            editBookModal: false, editBookData: { id: '', etat: '', user_id: ''}
          })
        });
      }
      editBook(id, etat, user_id) {
        this.setState({
          editBookData: { id, etat, user_id}, editBookModal: ! this.state.editBookModal
        });
      }
      deleteBook(id) {
        axios.delete('http://localhost:8000/api/message/' + id).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:8000/api/message').then((response) => {
        this.setState({
          books: response.data
        })
        });
      }

      _refreshBooks_2() {
        axios.get('http://localhost:8000/api/message/users').then((response) => {
        this.setState({
          users: response.data
        })
        });
      }

    render(){ 

        let users = this.state.users.map((user) => {
            return (
                <option value={user.id}>{user.nom} {user.prenom}</option>
            )
            });

        let onlines = this.state.users.map((online) => {
            return (
                <div class="avatar-icon-wrapper">
                    {online.dtype == "client"?<div class="badge badge-success badge-dot badge-dot-lg">
                    </div>: null }
                    {online.dtype == "emp"?<div class="badge badge-danger badge-dot badge-dot-lg">
                    </div>: null }
                    {online.dtype == "rec"?<div class="badge badge-warning badge-dot badge-dot-lg">
                    </div>: null }
                    {online.dtype == "serveur"?<div class="badge badge-primary badge-dot badge-dot-lg">
                    </div>: null }
                    <div class="avatar-icon">
                    <img src={online.url} alt=""/>
                    </div>
                </div>
            )
            });
           

        let books = this.state.users.map((book) => {
            return (
                <tr>
                    <td class="text-center" style={{width: 78}}>
                            
                    </td>
                    <td class="text-left pl-1">
                        <i class="fa fa-star"></i>
                    </td>
                    <td>
                        <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                                <div class="avatar-icon-wrapper">
                                {book.dtype == "client"?<div class="badge badge-success badge-dot badge-dot-lg">
                                </div>: null }
                                {book.dtype == "emp"?<div class="badge badge-danger badge-dot badge-dot-lg">
                                </div>: null }
                                {book.dtype == "rec"?<div class="badge badge-warning badge-dot badge-dot-lg">
                                </div>: null }
                                {book.dtype == "serveur"?<div class="badge badge-primary badge-dot badge-dot-lg">
                                </div>: null }
                                    <img width="42" class="rounded-circle" src={book.url} alt=""/>
                                </div>
                                <div class="widget-content-left">
                                    <div class="widget-heading">{book.nom} {book.prenom}</div>
                                    <div class="widget-subheading">{book.created_at}</div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="text-left">
                        <Link to={"/mailboxprive"} aria-haspopup="true" aria-expanded="false" class="btn-shadow btn btn-info">
                            <span class="btn-icon-wrapper pr-2 opacity-7">
                                <i class="fa fa-business-time fa-w-20"></i>
                            </span>
                            Voir La discussion
                        </Link>              
                    </td>
                    <td>
                        {/* <i class="fa fa-tags fa-w-20 opacity-4"></i> */}
                    </td>
                    <td class="text-right">
                        {/* <i class="fa fa-calendar-alt opacity-4 mr-2"></i>
                        ### */}
                    </td>
                </tr>
            )
            });

    return (
    <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
        <Header/>
            <div class="app-main">
                <LeftBar/>
                <div class="app-main__outer">
                        <div class="app-main__inner">
                            <div class="app-inner-layout">
                                <div class="app-inner-layout__wrapper">
                                    <div class="app-inner-layout__content card">
                                        <div>
                                            <div class="app-inner-layout__top-pane">
                                                <div class="pane-left">
                                                    <div class="mobile-app-menu-btn">
                                                        <button type="button" class="hamburger hamburger--elastic">
                                                            <span class="hamburger-box">
                                                                <span class="hamburger-inner"></span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <h4 class="mb-0">Inbox</h4>
                                                </div>
                                                <div class="pane-right">
                                                    
                                                </div>
                                            </div>
                                            <div class="bg-white">
                                                <div class="table-responsive">
                                                    <table class="text-nowrap table-lg mb-0 table table-hover">
                                                        <tbody>
                                                        {books}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="app-inner-layout__sidebar card">
                                        <ul class="nav flex-column">
                                            <li class="pt-4 pl-3 pr-3 pb-3 nav-item">
                                                <button class="btn-pill btn-shadow btn btn-primary btn-block" onClick={this.toggleNewBookModal.bind(this)}>Write New Email</button>
                                                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                                                    <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new Message</ModalHeader>
                                                    <ModalBody>
                                                
                                                    <FormGroup>
                                                    <Label for="Utilisateur">Utilisateur</Label>
                                                    <select class="multiselect-dropdown form-control" id="user_id" value={this.state.newBookData.user_id} onChange={(e) => {
                                                            let { newBookData } = this.state;
                                                            newBookData.user_id = e.target.value;
                                                            this.setState({ newBookData });
                                                        }}>
                                                            {users}
                                                    </select>
                                                    </FormGroup>

                                                    <FormGroup>
                                                    <Label for="Message">Message</Label>
                                                    <Input id="etat" value={this.state.newBookData.etat} onChange={(e) => {
                                                        let { newBookData } = this.state;

                                                        newBookData.etat = e.target.value;

                                                        this.setState({ newBookData });
                                                    }} />
                                                    </FormGroup>

                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" onClick={this.addBook.bind(this)}>Envoi Message</Button>{' '}
                                                        <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </li>
                                            <li class="nav-item-divider nav-item"></li>
                                            <li class="nav-item-header nav-item">Online Friends</li>
                                            <li class="text-center p-2 nav-item">
                                                <div>
                                                    {onlines}
                                                </div>
                                            </li>
                                            {/* <li class="nav-item-btn text-center nav-item">
                                                <button class="btn-wide btn-pill btn btn-success btn-sm">Start New Conversation</button>
                                            </li> */}
                                            <li class="nav-item-divider nav-item"></li>
                                            <li class="nav-item-header nav-item">Tags
                                                <small class="ml-1">Important</small>
                                            </li>
                                            <li class="nav-item">
                                                <button type="button" tabindex="0" class="d-flex align-items-center dropdown-item">
                                                    <div class="badge ml-0 mr-3 badge-dot badge-dot-xl badge-success">Dark</div>
                                                    Client
                                                </button>
                                                <div tabindex="-1" class="dropdown-divider"></div>
                                                <button type="button" tabindex="0" class="d-flex align-items-center dropdown-item">
                                                    <div class="badge ml-0 mr-3 badge-dot badge-dot-xl badge-danger">Dark</div>
                                                    Employeur
                                                </button>
                                                <div tabindex="-1" class="dropdown-divider"></div>
                                                <button type="button" tabindex="0" class="d-flex align-items-center dropdown-item">
                                                    <div class="badge ml-0 mr-3 badge-dot badge-dot-xl badge-warning">Dark</div>
                                                    Reciptioniste
                                                </button>
                                                <div tabindex="-1" class="dropdown-divider"></div>
                                                <button type="button" tabindex="0" class="d-flex align-items-center dropdown-item">
                                                    <div class="badge ml-0 mr-3 badge-dot badge-dot-xl badge-primary">Dark</div>
                                                    Serveur
                                                </button>
                                            </li>
                                        </ul>
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
export default MailBox;
