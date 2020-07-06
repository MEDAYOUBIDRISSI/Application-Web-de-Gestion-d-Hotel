import React , { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar';
import Footer from './../MasterPage/Footer';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';

class Reservation_rec extends Component {
    state = {
        espaces:[],
        users: [],
        books: [],
        newBookData: {
            date_debut: '',
            date_fin: '',
            client_id: 2,
            cl_nom:'',
            cl_prenom:'',
            etat: '',
            receptionniste_id: 3,
            rec_nom:'',
            rec_prenom:'',
            espace_id: '',
            libelle: '',
        },
        editBookData: {
          id: '',
          date_debut: '',
          date_fin: '',
          client_id: 2,
          cl_nom:'',
          cl_prenom:'',
          etat: '',
          receptionniste_id: 3,
          rec_nom: '',
          rec_prenom:'',
          espace_id: '',
          libelle: '',

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
        axios.post('http://localhost:8000/api/reseravtion/client/', this.state.newBookData).then((response) => {
          let { books } = this.state;
    
          books.push(response.data);
          this._refreshBooks();
          this.setState({ books, newBookModal: false, newBookData: {
            date_debut: '',
            date_fin: '',
            client_id: 2,
            cl_nom:'',
            cl_prenom:'',
            etat: '',
            receptionniste_id: 3,
            rec_nom:'',
            rec_prenom:'',
            espace_id: '',
            libelle: '',
          }});
        });
      }
      updateBook() {
        let { date_debut, date_fin, client_id,cl_nom,cl_prenom, etat, receptionniste_id,rec_nom,rec_prenom, espace_id ,libelle} = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/reseravtion/client/' + this.state.editBookData.id, {
          date_debut, date_fin, client_id,cl_nom,cl_prenom, etat, receptionniste_id,rec_prenom,rec_nom,espace_id,libelle
        }).then((response) => {
          this._refreshBooks();
    
          this.setState({
            editBookModal: false, editBookData: { id: '', date_debut: '', date_fin: '',client_id: 2,cl_nom:'',cl_prenom:'', etat: '',receptionniste_id: 3,rec_nom:'',rec_prenom:'', espace_id:'', libelle:'' }
          })
        });
      }
      editBook(id, date_debut, date_fin, client_id,cl_nom,cl_prenom, etat, receptionniste_id,rec_nom,rec_prenom, espace_id, libelle) {
        console.log(id)
        this.setState({
          editBookData: { id, date_debut, date_fin, client_id,cl_nom,cl_prenom, etat, receptionniste_id,rec_nom,rec_prenom, espace_id,libelle }, editBookModal: ! this.state.editBookModal
        });

      }
      deleteBook(id) {
        axios.delete('http://localhost:8000/api/reseravtion/client/' + id).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:8000/api/reseravtion/client').then((response) => {
          //console.log(response.data)
        this.setState({
          books: response.data
        })
        });
      }
      _refreshBooks_2() {
        axios.get('http://localhost:8000/api/reseravtion/client/specifier').then((response) => {
          //console.log(response.data)
        this.setState({
          users: response.data
        })
        });
      }
      _refreshBooks_3() {
        axios.get('http://localhost:8000/api/espace/client').then((response) => {
          //console.log(response.data)
        this.setState({
          espaces: response.data
        })
        });
      }


    
    render(){
        let espaces = this.state.espaces.map((espace) => {
            return (
                <option value={espace.id}>{espace.libelle}</option>
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
                                                            <div class="widget-heading"><Link to={"/dash"}>Roteur</Link></div>
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
                <tr class="fc-list-item">
                    <td class="fc-list-item-time ">
                        {book.etat == '0'?<div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-warning">warning</div>: null }
                        {book.etat == '1'?<div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-success">success</div>: null }
                        {book.etat == '2'?<div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-danger">danger</div>: null }
                            #{book.id}:From {book.date_debut} to {book.date_fin}
                    </td>
                    <td class="fc-list-item-title "><a>#{book.espace_id} - {book.libelle}</a></td>
                    <td class="fc-list-item-title "><a> {book.rec_nom} {book.rec_prenom}</a></td>
                    <td class="fc-list-item-title ">
                        <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-warning" onClick={this.editBook.bind(this,book.id,book.date_debut,book.date_fin,book.client_id,book.cl_nom,book.cl_prenom,book.etat,book.receptionniste_id,book.rec_nom,book.rec_prenom,book.espace_id,book.libelle)}>Edit</button>
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
                            <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12">
                            {users}
                        </div>
                    </div>        
                            <div class="tabs-animation">          
                        <div class="tabs-animation">
                            <div class="card mb-3">
                                <div class="card-header-tab card-header">
                                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                                    <div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-warning">warning</div>
                                  Reservation  On attende | 
                                    <div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-success">success</div>
                                  Reservation Validée | 
                                    <div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-danger">danger</div>
                                    Reservation pas Validée |
                                  
                                    <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                                    <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new Reservation</ModalHeader>
                                    <ModalBody> 
                                    <FormGroup>
                                    {/* <Label for="date_debut"></Label> */}
                                    <div class="card-body">
                                        <h5 class="card-title">date_debut</h5>
                                        <input type="date" class="form-control" data-toggle="datepicker" id="date_debut" value={this.state.newBookData.date_debut} onChange={(e) => {
                                        let { newBookData } = this.state;

                                        newBookData.date_debut = e.target.value;

                                        this.setState({ newBookData });
                                    }}/>
                                    </div>
                                    </FormGroup>
                                    <FormGroup>
                                    {/* <Label for="date_fin"></Label> */}
                                    <div class="card-body">
                                        <h5 class="card-title">date_fin</h5>
                                        <input type="date" class="form-control" data-toggle="datepicker" id="date_fin" value={this.state.newBookData.date_fin} onChange={(e) => {
                                        let { newBookData } = this.state;

                                        newBookData.date_fin = e.target.value;

                                        this.setState({ newBookData });
                                    }}/>
                                    </div>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="Espace">Espace</Label>
                                        <select class="multiselect-dropdown form-control" id="espace_id" value={this.state.newBookData.espace_id} onChange={(e) => {
                                                let { newBookData } = this.state;
                                                newBookData.espace_id = e.target.value;
                                                this.setState({ newBookData });
                                          }}>
                                          {espaces}
                                        </select>
                                        </FormGroup>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.addBook.bind(this)}>Add Client</Button>{' '}
                                        <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>


                                {/* Edite */}
                                <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                                <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new Client</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <div class="card-body">
                                        <h5 class="card-title">date_debut</h5>
                                        <input type="date" class="form-control" data-toggle="datepicker" id="date_debut" value={this.state.editBookData.date_debut} onChange={(e) => {
                                        let { editBookData } = this.state;

                                        editBookData.date_debut = e.target.value;

                                        this.setState({ editBookData });
                                    }} />
                                    </div>
                                    </FormGroup>

                                    <FormGroup>
                                    <div class="card-body">
                                        <h5 class="card-title">date_fin</h5>
                                        <input type="date" class="form-control" data-toggle="datepicker" id="date_fin" value={this.state.editBookData.date_fin} onChange={(e) => {
                                        let { editBookData } = this.state;

                                        editBookData.date_fin = e.target.value;

                                        this.setState({ editBookData });
                                    }} />
                                    </div>
                                    </FormGroup>

                                    <FormGroup>
                                      <Label for="Espace">Espace</Label>
                                      <select class="multiselect-dropdown form-control" id="espace_id" value={this.state.editBookData.espace_id} onChange={(e) => {
                                            let { editBookData } = this.state;

                                            editBookData.espace_id = e.target.value;

                                            this.setState({ editBookData });
                                        }}>
                                        {espaces}
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
                            <div class="card-body">
                                <table id="example" class="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <td class="fc-list-item-time " style={{width:350}}>
                                                Periode
                                            </td>

                                            <td class="fc-list-item-time " style={{width:200}}>
                                            Espace
                                            </td>

                                            <td class="fc-list-item-time " style={{width:200}}>
                                            Receptionniste
                                            </td>

                                            <td>
                                                <Button className="btn-shadow btn btn-info"  onClick={this.toggleNewBookModal.bind(this)}>Ajouter Reservation</Button>
                                            </td>
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
    )
    }
}
export default Reservation_rec;
