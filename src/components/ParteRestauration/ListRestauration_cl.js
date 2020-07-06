import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar';
import Footer from './../MasterPage/Footer';


class ListRestauration extends Component {

    state = {
        tables:[],
        books: [],
        users:[],
        newBookData: {
            tabe_id: '',
            client_id:''
        },
        editBookData: {
          id: '',
          tabe_id: '',
          client_id:''
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
        axios.post('http://localhost:8000/api/reseravtion/restauration/', this.state.newBookData).then((response) => {
          let { books } = this.state;
    
          books.push(response.data);
          this._refreshBooks();
          this.setState({ books, newBookModal: false, newBookData: {
            tabe_id: '',
            client_id:''
          }});
        });
      }
      updateBook() {
        let { tabe_id,client_id } = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/reseravtion/restauration/' + this.state.editBookData.id, {
          tabe_id,client_id
        }).then((response) => {
          this._refreshBooks();
    
          this.setState({
            editBookModal: false, editBookData: { id: '',tabe_id: '',client_id:''}
          })
        });
      }
      editBook(id,tabe_id,client_id) {
        this.setState({
          editBookData: { id,tabe_id,client_id }, editBookModal: ! this.state.editBookModal
        });
      }
      deleteBook(id) {
        axios.delete('http://localhost:8000/api/reseravtion/restauration/' + id).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:8000/api/reseravtion/restauration').then((response) => {
          console.log(response.data)
        this.setState({
          books: response.data
        })
        });

      }

      _refreshBooks_2() {
        axios.get('http://localhost:8000/api/users/client').then((response) => {
          console.log(response.data)
        this.setState({
          users: response.data
        })
        });

      }
      _refreshBooks_3() {
        axios.get('http://localhost:8000/api/table').then((response) => {
          console.log(response.data)
        this.setState({
          tables: response.data
        })
        });

      }
    
    render(){ 
    

      let tables = this.state.tables.map((table) => {
        return (
            <option value={table.id}>Nombre Place : {table.nbrplace}</option>
        )
      });  
      let users = this.state.users.map((user) => {
        return (
            <option value={user.id}>{user.nom} {user.prenom}</option>
        )
      });  
      
      
      let books = this.state.books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>
                    {book.prenomclient != null? book.prenomclient : null }
                    {book.prenomclient == null?<span class="badge badge-danger align-text-bottom ml-1">Ajouter Client!</span>: null }
                </td>
                <td>
                    {book.nomclient != null? book.nomclient : null }
                    {book.nomclient == null?<span class="badge badge-danger align-text-bottom ml-1">Ajouter Client!</span>: null }
                </td>
                <td>{book.prenomserveur}</td>
                <td>{book.nomserveur}</td>
                <td>#{book.tabe_id}-<br></br>[{book.nbrplace}Place]</td>
                <td>
                    #{book.cmd_id != null? book.cmd_id : null }
                    {book.cmd_id == null?<span class="badge badge-danger align-text-bottom ml-1">Ajouter Cmd!</span>: null }
                </td>
                <td>{book.created_at}</td>
                <td>
                  <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-warning" onClick={this.editBook.bind(this, book.id,book.tabe_id,book.client_id)}>Edit</button>
                  <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-danger" onClick={this.deleteBook.bind(this, book.id)}>Delete</button>
                  <Link to={"/leurcmd"} class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-focus">Leur Comandes</Link>
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
                                List des Reservations en Restaurant
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
                                <Button className="btn-shadow btn btn-info"  onClick={this.toggleNewBookModal.bind(this)}>Ajouter Reservation</Button>

                                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                                    <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new Reservation</ModalHeader>
                                    <ModalBody>

                                    <FormGroup>
                                    <Label for="Table">Table</Label>
                                    <select class="multiselect-dropdown form-control" id="tabe_id" value={this.state.newBookData.tabe_id} onChange={(e) => {
                                            let { newBookData } = this.state;
                                            newBookData.tabe_id = e.target.value;
                                            this.setState({ newBookData });
                                      }}>
                                      {tables}
                                    </select>
                                    </FormGroup>

                                    <FormGroup>
                                    <Label for="Client">Client</Label>
                                    <select class="multiselect-dropdown form-control" id="client_id" value={this.state.newBookData.client_id} onChange={(e) => {
                                            let { newBookData } = this.state;
                                            newBookData.client_id = e.target.value;
                                            this.setState({ newBookData });
                                      }}>
                                      {users}
                                    </select>
                                    </FormGroup>


                                  </ModalBody>
                                  <ModalFooter>
                                      <Button color="primary" onClick={this.addBook.bind(this)}>Add Reservation</Button>{' '}
                                      <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                                  </ModalFooter>
                                </Modal>
                                
                                <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                                <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new Reservation</ModalHeader>
                                <ModalBody>

                                    <FormGroup>
                                    <Label for="Table">Table</Label>
                                    <select class="multiselect-dropdown form-control" id="tabe_id" value={this.state.editBookData.tabe_id} onChange={(e) => {
                                        let { editBookData } = this.state;

                                        editBookData.tabe_id = e.target.value;

                                        this.setState({ editBookData });
                                    }}>
                                    {tables}
                                    </select>
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="Client">Client</Label>
                                    <select class="multiselect-dropdown form-control" id="client_id" value={this.state.editBookData.client_id} onChange={(e) => {
                                        let { editBookData } = this.state;

                                        editBookData.client_id = e.target.value;

                                        this.setState({ editBookData });
                                    }}>
                                    {users}
                                    </select>
                                    </FormGroup>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.updateBook.bind(this)}>Update Reservation</Button>{' '}
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
                            <table id="example" class="table table-hover table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>PrenomClient</th>
                                        <th>NomClient</th>
                                        <th>PrenomServeur</th>
                                        <th>NomServeur</th>
                                        <th>#Table</th>
                                        <th>#CMD</th>
                                        <th>Crée a</th>
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
export default ListRestauration;
