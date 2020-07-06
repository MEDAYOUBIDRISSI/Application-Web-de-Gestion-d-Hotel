import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar';
import Footer from './../MasterPage/Footer';


class LeurCmd extends Component {

    state = {
        produits:[],
        users: [],
        books: [],
        newBookData: {
            cmd_id: '',
            produit_id: '',
            qte:''
        },
        editBookData: {
        id: '',
        cmd_id: '',
        produit_id: '',
        qte:''
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
        axios.post('http://localhost:8000/api/lignecmd/client/', this.state.newBookData).then((response) => {
          let { books } = this.state;
    
          books.push(response.data);
          this._refreshBooks();
          this.setState({ books, newBookModal: false, newBookData: {
            cmd_id: '',
            produit_id: '',
            qte:''
          }});
        });
      }
      updateBook() {
        let { cmd_id, produit_id, qte } = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/lignecmd/client/' + this.state.editBookData.id, {
            cmd_id, produit_id, qte
        }).then((response) => {
          this._refreshBooks();
    
          this.setState({
            editBookModal: false, editBookData: { id: '', cmd_id: '', produit_id: '', qte:''}
          })
        });
      }
      editBook(id, cmd_id, produit_id,qte) {
        this.setState({
          editBookData: { id, cmd_id, produit_id, qte }, editBookModal: ! this.state.editBookModal
        });
      }
      deleteBook(id) {
        axios.delete('http://localhost:8000/api/lignecmd/client/' + id).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:8000/api/reseravtion/restauration/lignecmds').then((response) => {
          console.log(response.data)
        this.setState({
          books: response.data
        })
        });
      }
      _refreshBooks_2() {
        axios.get('http://localhost:8000/api/reseravtion/restauration/specifier').then((response) => {
        this.setState({
          users: response.data
        })
        });
      }

      _refreshBooks_3() {
        axios.get('http://localhost:8000/api/produit').then((response) => {
        this.setState({
          produits: response.data
        })
        });
      }

    render(){ 
        let produits = this.state.produits.map((produit) => {
            return (
                <option value={produit.id}>{produit.libelle}</option>
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
                                                            <div class="widget-heading"><Link to={"/listrestauration"}>Roteur</Link></div>
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
                        <a href="javascript:void(0)" class="text-big">Produit : {book.libelle}</a>
                        {/* <span class="badge badge-danger align-text-bottom ml-1">Hot!</span> */}
                        <div class="text-muted small mt-1">
                        <a href="javascript:void(0)" class="text-muted">Crée a {book.created_at}.
                        <br/>
                         #cmd : {book.cmd_id}.</a>
                        </div>
                    </div>
                    <div class="d-none d-md-block col-8">
                        <div class="row no-gutters align-items-center">
                            <div class="col-6">
                            <div class="line-height-1 text-truncate">Quantite : {book.qte}</div>
                            <div class="media-body flex-truncate ml-2">
                                    <a href="javascript:void(0)" class="text-muted small text-truncate">by {book.prix}DH</a>
                            </div>
                            </div>
                            <div class="media col-3 align-items-center">
                                <img style={{width: 40 }} src={book.url} alt="" class="d-block ui-w-30 rounded-circle"/>
        
                            </div>
                            <div class="media col-3 align-items-center">
                                <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-warning" onClick={this.editBook.bind(this,book.id, book.cmd_id, book.produit_id, book.qte)}>Edit</button>
                                <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-danger" onClick={this.deleteBook.bind(this, book.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="m-0"/>
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
                        {users}     
                    <div class="d-flex flex-wrap justify-content-between">
                        <div>
                            <Button className="btn btn-shadow btn-wide btn-primary"  onClick={this.toggleNewBookModal.bind(this)}>
                                <span class="btn-icon-wrapper pr-2 opacity-7">
                                        <i class="fa fa-plus fa-w-20"></i>
                                </span>
                                Ajouter Produit
                            </Button>
                            <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                                <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new Produit</ModalHeader>
                                <ModalBody>
                            
                                <FormGroup>
                                <Label for="Produit">Produit</Label>
                                <select class="multiselect-dropdown form-control" id="produit_id" value={this.state.newBookData.produit_id} onChange={(e) => {
                                        let { newBookData } = this.state;
                                        newBookData.produit_id = e.target.value;
                                        this.setState({ newBookData });
                                    }}>
                                    {produits}
                                </select>
                                </FormGroup>

                                <FormGroup>
                                <Label for="qte">qte</Label>
                                <Input id="qte" value={this.state.newBookData.qte} onChange={(e) => {
                                    let { newBookData } = this.state;

                                    newBookData.qte = e.target.value;

                                    this.setState({ newBookData });
                                }} />
                                </FormGroup>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.addBook.bind(this)}>Add Produit</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                                </ModalFooter>
                            </Modal>


                                    <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                                    <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new Produit</ModalHeader>
                                    <ModalBody>
                                    <FormGroup>
                                        <Label for="Client">Client</Label>
                                        <select class="multiselect-dropdown form-control" id="produit_id" value={this.state.editBookData.produit_id} onChange={(e) => {
                                            let { editBookData } = this.state;

                                            editBookData.produit_id = e.target.value;

                                            this.setState({ editBookData });
                                        }}>
                                        {produits}
                                        </select>
                                        </FormGroup>

                                        <FormGroup>
                                        <Label for="qte">qte</Label>
                                        <Input id="qte" value={this.state.editBookData.qte} onChange={(e) => {
                                            let { editBookData } = this.state;

                                            editBookData.qte = e.target.value;

                                            this.setState({ editBookData });
                                        }} />
                                        </FormGroup>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.updateBook.bind(this)}>Update Produit</Button>{' '}
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
                                        <div class="col-6">Quantitée</div>
                                        <div class="col-3">Image</div>
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
export default LeurCmd;
