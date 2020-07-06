import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar';
import Footer from './../MasterPage/Footer';


class ListEmp extends Component {

    state = {
        taches: [],
        books: [],
         //
        newBookData: {
            nom: '',
            description : '',
            type_tache_id: '',
        },
        editBookData: {
          id: '',
          nom: '',
          description : '',
          type_tache_id: '',
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
        axios.post('http://localhost:8000/api/users/tache/list/', this.state.newBookData).then((response) => {
          let { books } = this.state;
    
          books.push(response.data);
          this._refreshBooks();
          this.setState({ books, newBookModal: false, newBookData: {
            nom: '',
            description : '',
            type_tache_id: '',
          }});
        });
      }
      updateBook() {
        let { nom, description, type_tache_id } = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/users/tache/list/' + this.state.editBookData.id, {
          nom, description, type_tache_id
        }).then((response) => {
          this._refreshBooks();
    
          this.setState({
            editBookModal: false, editBookData: { id: '', nom: '', description : '', type_tache_id: ''}
          })
        });
      }
      editBook(id, nom, description , type_tache_id) {
        this.setState({
          editBookData: { id, nom, description , type_tache_id }, editBookModal: ! this.state.editBookModal
        });
      }
      deleteBook(id) {
        axios.delete('http://localhost:8000/api/users/tache/list/' + id).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:8000/api/users/tache/list').then((response) => {
          console.log(response.data)
        this.setState({
          books: response.data
        })
        });
      }

      _refreshBooks_2() {
        axios.get('http://localhost:8000/api/typetache').then((response) => {
          //console.log(response.data)
        this.setState({
            taches: response.data
        })
        });
      }

    render(){ 

        let taches = this.state.taches.map((tache) => {
            return (
                <option value={tache.id}>{tache.libelle}</option>
            )
          }); 


        let books = this.state.books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.nom}</td>
                <td>{book.description}</td>
                <td>{book.typetache}</td>
                <td>
                  <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-warning" onClick={this.editBook.bind(this, book.id, book.nom, book.description , book.type_tache_id)}>Edit</button>
                  <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-danger" onClick={this.deleteBook.bind(this, book.id)}>Delete</button>
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
                        <div class="tabs-animation">
                    <div class="app-page-title">
                        <div class="page-title-wrapper">
                            <div class="page-title-heading">
                                <div>
                                    List des Taches
                                    <div class="page-title-subheading">
                                        This is an example dashboard created using build-in elements and components.
                                    </div>
                                </div>
                            </div>
                            <div class="page-title-actions">
                                <div class="d-inline-block">
                                    {/* <button type="button" class="btn-shadow btn btn-info ">
                                        Ajouter Client
                                    </button> */}
                                    <Button className="btn-shadow btn btn-info"  onClick={this.toggleNewBookModal.bind(this)}>Ajouter Tache</Button>

                                    <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                                        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new Tache</ModalHeader>
                                        <ModalBody>
                                    
                                        <FormGroup>
                                        <Label for="Libelle">Libelle</Label>
                                        <Input id="nom" value={this.state.newBookData.nom} onChange={(e) => {
                                            let { newBookData } = this.state;

                                            newBookData.nom = e.target.value;

                                            this.setState({ newBookData });
                                        }} />
                                        </FormGroup>
                                        <FormGroup>
                                        <Label for="description ">description </Label>
                                        <Input id="description " value={this.state.newBookData.description } onChange={(e) => {
                                            let { newBookData } = this.state;

                                            newBookData.description  = e.target.value;

                                            this.setState({ newBookData });
                                        }} />
                                        </FormGroup>

                                        <FormGroup>
                                        <Label for="Type Tache">Type Tache</Label>
                                        <select class="multiselect-dropdown form-control" id="type_tache_id" value={this.state.newBookData.type_tache_id} onChange={(e) => {
                                                let { newBookData } = this.state;
                                                newBookData.type_tache_id = e.target.value;
                                                this.setState({ newBookData });
                                          }}>
                                          {taches}
                                        </select>
                                        </FormGroup>

                                      </ModalBody>
                                      <ModalFooter>
                                          <Button color="primary" onClick={this.addBook.bind(this)}>Ajouter Tache</Button>{' '}
                                          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                                      </ModalFooter>
                                    </Modal>
                                    
                                    <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                                    <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new Tache</ModalHeader>
                                    <ModalBody>
                                        <FormGroup>
                                        <Label for="nom">nom</Label>
                                        <Input id="nom" value={this.state.editBookData.nom} onChange={(e) => {
                                            let { editBookData } = this.state;

                                            editBookData.nom = e.target.value;

                                            this.setState({ editBookData });
                                        }} />
                                        </FormGroup>
                                        <FormGroup>
                                        <Label for="description ">description </Label>
                                        <Input id="description " value={this.state.editBookData.description } onChange={(e) => {
                                            let { editBookData } = this.state;

                                            editBookData.description  = e.target.value;

                                            this.setState({ editBookData });
                                        }} />
                                        </FormGroup>

                                        <FormGroup>
                                        <Label for="Type Tache">Type Tache</Label>
                                        <select class="multiselect-dropdown form-control" id="type_tache_id" value={this.state.editBookData.type_tache_id} onChange={(e) => {
                                            let { editBookData } = this.state;

                                            editBookData.type_tache_id = e.target.value;

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
                            </div>    
                        </div>
                    </div>            
                    <div class="tabs-animation">
                        <div class="card mb-3">
                            <div class="card-header-tab card-header">
                                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                                    Easy Dynamic Tables
                                </div>
                            </div>
                            <div class="card-body">
                                <table id="example" class="table table-hover ">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Description</th>
                                            <th>TypeTache</th>
                                            <th>Mis a Jour</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {books}
                                    </tbody>
                                </table>
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
export default ListEmp;
