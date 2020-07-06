import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar';
import Footer from './../MasterPage/Footer';


class TacheValide extends Component {

    state = {

        books: [],
        editBookData: {
        iddatetache: '',
        duree: '',
        idtache: '',
        etat:''
        },
        editBookModal: false
      }
      componentWillMount() {
        this._refreshBooks();
      }

      toggleEditBookModal() {
        this.setState({
          editBookModal: ! this.state.editBookModal
        });
      }
      updateBook() {
        let { duree, idtache, etat } = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/users/tache/valide/' + this.state.editBookData.iddatetache, {
            duree, idtache , etat
        }).then((response) => {
          this._refreshBooks();
    
          this.setState({
            editBookModal: false, editBookData: { iddatetache: '', duree: '', idtache: '', etat:''}
          })
        });
      }
      editBook(iddatetache, duree, idtache , etat) {
        this.setState({
          editBookData: { iddatetache, duree, idtache ,etat}, editBookModal: ! this.state.editBookModal
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

    render(){ 

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
                            {book.etat == '1'?<div class="line-height-1 text-truncate"><div class="badge badge-pill badge-success">Accompli a {book.updated_at}</div></div>: null }
                            </div>
                            <div class="media col-3 align-items-center">
                                {/* <img style={{width: 40 }} src="images/avatars/2.jpg" alt="" class="d-block ui-w-30 rounded-circle"/> */}
                                {book.etat == '0'?<span class="badge badge-danger align-text-bottom ml-1">Pas Terminée!</span>: null }
                                {book.etat == '1'?<span class="badge badge-success align-text-bottom ml-1">Terminée!</span>: null }
                            </div>
                            <div class="media col-3 align-items-center">
                            {book.etat == '0'?<button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-warning" onClick={this.editBook.bind(this, book.iddatetache, book.duree, book.idtache ,book.etat)}>Edit</button>: null }
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
                            <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                                <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new Tache</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                    <Label for="Validation">Validation</Label>
                                    <select class="multiselect-dropdown form-control" id="etat" value={this.state.editBookData.etat} onChange={(e) => {
                                        let { editBookData } = this.state;

                                        editBookData.etat = e.target.value;

                                        this.setState({ editBookData });
                                    }}>
                                        <option value="0">Pas Terminée</option>
                                        <option value="1">Terminée</option>
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
                                            <div class="col-3">Etat</div>
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
export default TacheValide;
