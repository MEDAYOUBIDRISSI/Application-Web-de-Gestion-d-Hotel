import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar';
import Footer from './../MasterPage/Footer';


class ListTable extends Component {

    state = {
        books: [],
        newBookData: {
            nbrplace: '',
        },
        editBookData: {
            id: '',
            nbrplace: '',
        },
        newBookModal: false,
        editBookModal: false
      }
      componentWillMount() {
        this._refreshBooks();
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
        axios.post('http://localhost:8000/api/table/', this.state.newBookData).then((response) => {
          let { books } = this.state;
    
          books.push(response.data);
    
          this.setState({ books, newBookModal: false, newBookData: {
            nbrplace: '',
          }});
        });
      }
      updateBook() {
        let { nbrplace } = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/table/' + this.state.editBookData.id, {
            nbrplace
        }).then((response) => {
          this._refreshBooks();
    
          this.setState({
            editBookModal: false, editBookData: { id: '', nbrplace: ''}
          })
        });
      }
      editBook(id, nbrplace) {
        this.setState({
          editBookData: { id, nbrplace }, editBookModal: ! this.state.editBookModal
        });
      }
      deleteBook(id) {
        axios.delete('http://localhost:8000/api/table/' + id).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:8000/api/table').then((response) => {
          console.log(response.data)
        this.setState({
          books: response.data
        })
        });
      }

    

    render(){ 
        
        let books = this.state.books.map((book) => {
            return (
                <div class="card-body py-3">
                    
                    <div class="row no-gutters align-items-center">
                        <div class="col">
                            <a href="javascript:void(0)" class="text-big">#Matricule : {book.id}</a>
                            {/* <span class="badge badge-danger align-text-bottom ml-1">Hot!</span> */}
                            <div class="text-muted small mt-1">
                            <a href="javascript:void(0)" class="text-muted">####################</a>
                            </div>
                        </div>
                        <div class="d-none d-md-block col-8">
                            <div class="row no-gutters align-items-center">
                                <div class="col-6">
                                <div class="line-height-1 text-truncate">{book.nbrplace} Place</div>
                                <div class="media-body flex-truncate ml-2">
                                    <a href="javascript:void(0)" class="text-muted small text-truncate">by Danon</a>
                            </div>
                                </div>
                                <div class="media col-3 align-items-center">
                                    <img style={{width: 40 }} src={book.url} alt="" class="d-block ui-w-30 rounded-circle"/>
                                    
                                </div>
                                <div class="media col-3 align-items-center">
                                    <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-warning" onClick={this.editBook.bind(this, book.id, book.nbrplace)}>Edit</button>
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
                          <div class="d-flex flex-wrap justify-content-between">
                            <div>
                                <Button className="btn btn-shadow btn-wide btn-primary"  onClick={this.toggleNewBookModal.bind(this)}>
                                    <span class="btn-icon-wrapper pr-2 opacity-7">
                                            <i class="fa fa-plus fa-w-20"></i>
                                    </span>
                                    Ajouter Table
                                </Button>
                                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                                            <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new Table</ModalHeader>
                                            <ModalBody>
                                        
                                            <FormGroup>
                                            <Label for="nbrplace">nbrplace</Label>
                                            <Input id="nbrplace" value={this.state.newBookData.nbrplace} onChange={(e) => {
                                                let { newBookData } = this.state;
    
                                                newBookData.nbrplace = e.target.value;
    
                                                this.setState({ newBookData });
                                            }} />
                                            </FormGroup>
                                            <FormGroup>
                                              <div class="card-body">
                                                  <h5 class="card-title">Image Table</h5>
                                                  <input type="file" class="form-control" />
                                              </div>
                                              </FormGroup>
    
                                          </ModalBody>
                                          <ModalFooter>
                                              <Button color="primary" onClick={this.addBook.bind(this)}>Add Table</Button>{' '}
                                              <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                                          </ModalFooter>
                                        </Modal>
    
    
                                        <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                                        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new Table</ModalHeader>
                                        <ModalBody>

                                            <FormGroup>
                                            <Label for="nbrplace">nbrplace</Label>
                                            <Input id="nbrplace" value={this.state.editBookData.nbrplace} onChange={(e) => {
                                                let { editBookData } = this.state;
    
                                                editBookData.nbrplace = e.target.value;
    
                                                this.setState({ editBookData });
                                            }} />
                                            </FormGroup>
                                            <FormGroup>
                                              <div class="card-body">
                                                  <h5 class="card-title">Changee Image Table</h5>
                                                  <input type="file" class="form-control" />
                                              </div>
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.updateBook.bind(this)}>Update Table</Button>{' '}
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
                                            <div class="col-6">nbrplace</div>
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
export default ListTable;
