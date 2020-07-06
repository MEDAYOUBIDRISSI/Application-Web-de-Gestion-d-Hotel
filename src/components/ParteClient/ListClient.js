import React, { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';


class ListClient extends Component {

    state = {
        books: [],
        newBookData: {
            username: '',
            password: '',
            nom: '',
            prenom: '',
            cne: '',
            tel: '',
            adresse: ''
        },
        editBookData: {
          id: '',
          username: '',
          password: '',
          nom: '',
          prenom: '',
          cne: '',
          tel: '',
          adresse: ''
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
        axios.post('http://localhost:8000/api/users/client/', this.state.newBookData).then((response) => {
          let { books } = this.state;
    
          books.push(response.data);
          this._refreshBooks();
          this.setState({ books, newBookModal: false, newBookData: {
            username: '',
            password: '',
            nom: '',
            prenom: '',
            cne: '',
            tel: '',
            adresse: ''
          }});
        });
      }
      updateBook() {
        let { username, password, nom, prenom, cne, tel, adresse } = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/users/client/' + this.state.editBookData.id, {
          username, password, nom, prenom, cne, tel, adresse
        }).then((response) => {
          this._refreshBooks();
    
          this.setState({
            editBookModal: false, editBookData: { id: '', username: '', password: '',nom: '', prenom: '',cne: '', tel:'', adresse:'' }
          })
        });
      }
      editBook(id, username, password, nom, prenom, cne, tel, adresse) {
        this.setState({
          editBookData: { id, username, password, nom, prenom, cne, tel, adresse }, editBookModal: ! this.state.editBookModal
        });
      }
      deleteBook(id) {
        axios.delete('http://localhost:8000/api/users/client/' + id).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:8000/api/users/client').then((response) => {
          console.log(response.data)
        this.setState({
          books: response.data
        })
        });

      }

    render(){ 
        let books = this.state.books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>
                    <img style={{width: 40 }} src={book.url} class="d-block ui-w-30 rounded-circle"/>
                </td>
                <td>{book.nom}</td>
                <td>{book.prenom}</td> 
                <td>{book.cne}</td>
                <td>{book.tel}</td>
                <td>{book.adresse}</td>
                <td>{book.username}</td>
                <td>
                  <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-warning" onClick={this.editBook.bind(this, book.id, book.username, book.password,book.nom, book.prenom, book.cne, book.tel, book.adresse)}>Edit</button>
                  <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-danger" onClick={this.deleteBook.bind(this, book.id)}>Delete</button>
                  <Link to={"/res"} class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-focus">Leur Reservation</Link>
                </td>
              </tr>
            )
          });
    return (       
      <div class="tabs-animation">
          <div class="app-page-title">
              <div class="page-title-wrapper">
                  <div class="page-title-heading">
                      <div>
                          List des Clients
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
                          <Button className="btn-shadow btn btn-info"  onClick={this.toggleNewBookModal.bind(this)}>Ajouter Client</Button>

                          <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                              <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new Client</ModalHeader>
                              <ModalBody>
                          
                              <FormGroup>
                              <Label for="username">username</Label>
                              <Input id="username" value={this.state.newBookData.username} onChange={(e) => {
                                  let { newBookData } = this.state;

                                  newBookData.username = e.target.value;

                                  this.setState({ newBookData });
                              }} />
                              </FormGroup>
                              <FormGroup>
                              <Label for="password">password</Label>
                              <Input id="password" value={this.state.newBookData.password} onChange={(e) => {
                                  let { newBookData } = this.state;

                                  newBookData.password = e.target.value;

                                  this.setState({ newBookData });
                              }} />
                              </FormGroup>
                              <FormGroup>
                              <Label for="nom">nom</Label>
                              <Input id="nom" value={this.state.newBookData.nom} onChange={(e) => {
                                  let { newBookData } = this.state;

                                  newBookData.nom = e.target.value;

                                  this.setState({ newBookData });
                              }} />
                              </FormGroup>


                              <FormGroup>
                              <Label for="prenom">prenom</Label>
                              <Input id="prenom" value={this.state.newBookData.prenom} onChange={(e) => {
                                  let { newBookData } = this.state;

                                  newBookData.prenom = e.target.value;

                                  this.setState({ newBookData });
                              }} />
                              </FormGroup>

                              <FormGroup>
                              <Label for="cne">cne</Label>
                              <Input id="cne" value={this.state.newBookData.cne} onChange={(e) => {
                                  let { newBookData } = this.state;

                                  newBookData.cne = e.target.value;

                                  this.setState({ newBookData });
                              }} />
                              </FormGroup>
                              <FormGroup>
                              <Label for="tel">tel</Label>
                              <Input id="tel" value={this.state.newBookData.tel} onChange={(e) => {
                                  let { newBookData } = this.state;

                                  newBookData.tel = e.target.value;

                                  this.setState({ newBookData });
                              }} />
                              </FormGroup>

                              <FormGroup>
                              <Label for="adresse">adresse</Label>
                              <Input id="adresse" value={this.state.newBookData.adresse} onChange={(e) => {
                                  let { newBookData } = this.state;

                                  newBookData.adresse = e.target.value;

                                  this.setState({ newBookData });
                              }} />
                              </FormGroup>
                              <FormGroup>
                                <div class="card-body">
                                    <h5 class="card-title">Image Profile</h5>
                                    <input type="file" class="form-control" />
                                </div>
                                </FormGroup>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.addBook.bind(this)}>Add Client</Button>{' '}
                                <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                            </ModalFooter>
                          </Modal>
                          
                          <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new Client</ModalHeader>
                          <ModalBody>
                              <FormGroup>
                              <Label for="username">username</Label>
                              <Input id="username" value={this.state.editBookData.username} onChange={(e) => {
                                  let { editBookData } = this.state;

                                  editBookData.username = e.target.value;

                                  this.setState({ editBookData });
                              }} />
                              </FormGroup>
                              <FormGroup>
                              <Label for="password">password</Label>
                              <Input id="password" value={this.state.editBookData.password} onChange={(e) => {
                                  let { editBookData } = this.state;

                                  editBookData.password = e.target.value;

                                  this.setState({ editBookData });
                              }} />
                              </FormGroup>

                              <FormGroup>
                              <Label for="nom">nom</Label>
                              <Input id="nom" value={this.state.editBookData.nom} onChange={(e) => {
                                  let { editBookData } = this.state;

                                  editBookData.nom = e.target.value;

                                  this.setState({ editBookData });
                              }} />
                              </FormGroup>
                              <FormGroup>
                              <Label for="prenom">prenom</Label>
                              <Input id="prenom" value={this.state.editBookData.prenom} onChange={(e) => {
                                  let { editBookData } = this.state;

                                  editBookData.prenom = e.target.value;

                                  this.setState({ editBookData });
                              }} />
                              </FormGroup>

                              <FormGroup>
                              <Label for="cne">cne</Label>
                              <Input id="cne" value={this.state.editBookData.cne} onChange={(e) => {
                                  let { editBookData } = this.state;

                                  editBookData.cne = e.target.value;

                                  this.setState({ editBookData });
                              }} />
                              </FormGroup>
                              <FormGroup>
                              <Label for="tel">tel</Label>
                              <Input id="tel" value={this.state.editBookData.tel} onChange={(e) => {
                                  let { editBookData } = this.state;

                                  editBookData.tel = e.target.value;

                                  this.setState({ editBookData });
                              }} />
                              </FormGroup>

                              <FormGroup>
                              <Label for="adresse">adresse</Label>
                              <Input id="adresse" value={this.state.editBookData.adresse} onChange={(e) => {
                                  let { editBookData } = this.state;

                                  editBookData.adresse = e.target.value;

                                  this.setState({ editBookData });
                              }} />
                              </FormGroup>
                              <FormGroup>
                                <div class="card-body">
                                    <h5 class="card-title">Changee Image Profile</h5>
                                    <input type="file" class="form-control" />
                                </div>
                                </FormGroup>

                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={this.updateBook.bind(this)}>Update Client</Button>{' '}
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
                                  <th>Image</th>
                                  <th>Nome</th>
                                  <th>Prenom</th>
                                  <th>CNE</th>
                                  <th>Telephone</th>
                                  <th>Adress</th>
                                  <th>Email</th>
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
    )}
}
export default ListClient;
