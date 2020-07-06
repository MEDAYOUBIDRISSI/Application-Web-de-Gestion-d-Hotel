import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar';
import Footer from '../MasterPage/Footer';


class LeurTache extends Component {

    state = {
        taches:[],
        users: [],
        books: [],
        newBookData: {
            duree: '',
            idtache: '',
        },
        editBookData: {
        iddatetache: '',
        duree: '',
        idtache: '',
        },
        newBookModal: false,
        editBookModal: false
      }
      componentWillMount() {
        this._refreshBooks();
        this._refreshBooks_2();
        this._refreshBooks_3();
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
        axios.post('http://localhost:8000/api/users/tache/', this.state.newBookData).then((response) => {
          let { books } = this.state;
    
          books.push(response.data);
          this._refreshBooks();
          this.setState({ books, newBookModal: false, newBookData: {
            duree: '',
            idtache: '',
          }});
        });
      }
      updateBook() {
        let { duree, idtache } = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/users/tache/' + this.state.editBookData.iddatetache, {
            duree, idtache
        }).then((response) => {
          this._refreshBooks();
    
          this.setState({
            editBookModal: false, editBookData: { iddatetache: '', duree: '', idtache: ''}
          })
        });
      }
      editBook(iddatetache, duree, idtache) {
        this.setState({
          editBookData: { iddatetache, duree, idtache }, editBookModal: ! this.state.editBookModal
        });
      }
      deleteBook(iddatetache) {
        axios.delete('http://localhost:8000/api/users/tache/' + iddatetache).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:8000/api/users/tache').then((response) => {
          console.log(response.data)
        this.setState({
          books: response.data
        })
        });
      }
      _refreshBooks_2() {
        axios.get('http://localhost:8000/api/users/tache/specifier').then((response) => {
          //console.log(response.data)
        this.setState({
          users: response.data
        })
        });
      }

      _refreshBooks_3() {
        axios.get('http://localhost:8000/api/tache').then((response) => {
         // console.log(response.data)
        this.setState({
          taches: response.data
        })
        });
      }

    render(){ 
        let taches = this.state.taches.map((tache) => {
            return (
                <option value={tache.id}>{tache.nom}</option>
            )
          }); 

        let users = this.state.users.map((user) => {
            return(
                <div class="card-shadow-primary card-border mb-3 card">
                                <div class="dropdown-menu-header">
                                    <div class="dropdown-menu-header-inner bg-primary">
                                        <div class="menu-header-image" style={{backgroundImage:"url('images/dropdown-header/city4.jpg')"}}></div>
                                        <div class="menu-header-content">
                                            <div class="avatar-icon-wrapper avatar-icon-lg">
                                                <div class="avatar-icon rounded btn-hover-shine"><img
                                                        src={user.url}
                                                        alt="Avatar 5"/></div>
                                            </div>
                                            <div><h5 class="menu-header-title">{user.nom} {user.prenom}</h5></div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="scroll-area-sm">
                                    <div class="scrollbar-container">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">
                                                <div class="widget-content p-0">
                                                    <div class="widget-content-wrapper">
                                                        <div class="widget-content-left">
                                                            <div class="widget-heading">User Name : {user.username}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item">
                                                <div class="widget-content p-0">
                                                    <div class="widget-content-wrapper">
                                                        <div class="widget-content-left">
                                                            <div class="widget-heading">Telephone : {user.tel}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item">
                                                <div class="widget-content p-0">
                                                    <div class="widget-content-wrapper">
                                                        
                                                        <div class="widget-content-left">
                                                            <div class="widget-heading">CNE : {user.cne}</div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item">
                                                <div class="widget-content p-0">
                                                    <div class="widget-content-wrapper">
                                                        
                                                        <div class="widget-content-left">
                                                            <div class="widget-heading">Adresse : {user.adresse}</div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item">
                                                <div class="widget-content p-0">
                                                    <div class="widget-content-wrapper">
                                                        <div class="widget-content-left">
                                                            <div class="widget-heading">Salaire : {user.salaire}DH</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item">
                                                <div class="widget-content p-0">
                                                    <div class="widget-content-wrapper">  
                                                        <div class="widget-content-left">
                                                            <div class="widget-heading">Date embauche : {user.date_embauche}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item">
                                                <div class="widget-content p-0">
                                                    <div class="widget-content-wrapper">
                                                        <div class="widget-content-left">
                                                            <div class="widget-heading"><Link to={"/listemp"}>Roteur</Link></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
            )
        })



    let books = this.state.books.map((book) => {
        return (
            <div class="card-body py-3">
                
                <div class="row no-gutters align-items-center">
                    <div class="col">
                        <a href="javascript:void(0)" class="text-big">Type Tache : {book.libelletache}</a>
                        <br/>
                        <a href="javascript:void(0)" class="text-big">Tache : {book.nomtache}</a>
                        {/* <span class="badge badge-danger align-text-bottom ml-1">Hot!</span> */}
                        <div class="text-muted small mt-1">
                        <a href="javascript:void(0)" class="text-muted">Durée : {book.duree}H.
                        <br/>
                         Description : {book.desctache}.</a>
                        </div>
                    </div>
                    <div class="d-none d-md-block col-8">
                        <div class="row no-gutters align-items-center">
                            <div class="col-6">
                            <div class="line-height-1 text-truncate">Crée a {book.created_at}</div>
                            <div class="media-body flex-truncate ml-2">
                                    <a href="javascript:void(0)" class="text-muted small text-truncate">by {book.prenomres} {book.nomres}</a>
                            </div>
                            <br/>
                            {book.etat == '1'?<div class="line-height-1 text-truncate">Accompli a {book.updated_at}</div>: null }
                            </div>
                            <div class="media col-3 align-items-center">
                                {/* <img style={{width: 40 }} src="images/avatars/2.jpg" alt="" class="d-block ui-w-30 rounded-circle"/> */}
                                {book.etat == '0'?<span class="badge badge-danger align-text-bottom ml-1">Pas Terminée!</span>: null }
                                {book.etat == '1'?<span class="badge badge-success align-text-bottom ml-1">Terminée!</span>: null }
                            </div>
                            <div class="media col-3 align-items-center">
                                <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-warning" onClick={this.editBook.bind(this, book.iddatetache, book.duree, book.idtache)}>Edit</button>
                                <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-danger" onClick={this.deleteBook.bind(this, book.iddatetache)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="m-0"/>
            </div>
            // idtache 	nomtache 	desctache
            // iddatetache 	duree 	etat
            // libelletache
            // nomemp 	prenomemp 	cneemp 	embaucheemp  salairemp
            // nomres 	prenomres
        )
        });
    return (
        <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
        <Header/>
            <div class="app-main">
                <LeftBar/>
                <div class="app-main__outer"> 
                    <div class="app-main__inner">    
                    {users}     
                        <div class="d-flex flex-wrap justify-content-between">
                            <div>
                                <Button className="btn btn-shadow btn-wide btn-primary"  onClick={this.toggleNewBookModal.bind(this)}>
                                    <span class="btn-icon-wrapper pr-2 opacity-7">
                                            <i class="fa fa-plus fa-w-20"></i>
                                    </span>
                                    Ajouter Tache
                                </Button>
                                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                                            <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new Tache</ModalHeader>
                                            <ModalBody>
                                        
                                            <FormGroup>
                                            <Label for="duree">duree</Label>
                                            <Input id="duree" value={this.state.newBookData.duree} onChange={(e) => {
                                                let { newBookData } = this.state;

                                                newBookData.duree = e.target.value;

                                                this.setState({ newBookData });
                                            }} />
                                            </FormGroup>

                                            <FormGroup>
                                            <Label for="Tache">Tache</Label>
                                            <select class="multiselect-dropdown form-control" id="idtache" value={this.state.newBookData.idtache} onChange={(e) => {
                                                    let { newBookData } = this.state;
                                                    newBookData.idtache = e.target.value;
                                                    this.setState({ newBookData });
                                            }}>
                                            {taches}
                                            </select>
                                            </FormGroup>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.addBook.bind(this)}>Add Tache</Button>{' '}
                                            <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                                        </ModalFooter>
                                        </Modal>


                                        <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                                        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new Tache</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                            <Label for="duree">duree</Label>
                                            <Input id="duree" value={this.state.editBookData.duree} onChange={(e) => {
                                                let { editBookData } = this.state;

                                                editBookData.duree = e.target.value;

                                                this.setState({ editBookData });
                                            }} />
                                            </FormGroup>
                                            
                                            <FormGroup>
                                            <Label for="Tache">Tache</Label>
                                            <select class="multiselect-dropdown form-control" id="idtache" value={this.state.editBookData.idtache} onChange={(e) => {
                                                let { editBookData } = this.state;

                                                editBookData.idtache = e.target.value;

                                                this.setState({ editBookData });
                                            }}>
                                            {taches}
                                            </select>
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.updateBook.bind(this)}>Update Tache</Button>{' '}
                                            <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
                                        </ModalFooter>
                                        </Modal>
                            </div>
                            {/* <div class="col-12 col-md-3 p-0 mb-3">
                                <input type="text" class="form-control" placeholder="Search..."/>
                            </div> */}
                        </div>

                        <div class="card mb-3">
                            <div class="card-header pl-0 pr-0">
                                <div class="row no-gutters w-100 align-items-center">
                                    <div class="col"></div>
                                    <div class="col-8 text-muted">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col-6">Replies</div>
                                            <div class="col-3">Last update</div>
                                            <div class="col-3">Mis a Jour</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {books}

                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
        )}
}
export default LeurTache;
