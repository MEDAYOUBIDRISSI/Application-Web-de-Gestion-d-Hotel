import React , { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Footer from './../MasterPage/Footer';

class Reservation_valide extends Component {
    state = {
        books: [],
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
      }
      toggleEditBookModal() {
        this.setState({
          editBookModal: ! this.state.editBookModal
        });
      }
      updateBook() {
        let { date_debut, date_fin, client_id,cl_nom,cl_prenom, etat, receptionniste_id,rec_nom,rec_prenom, espace_id ,libelle} = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/reseravtion/etat/' + this.state.editBookData.id, {
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
      _refreshBooks() {
        axios.get('http://localhost:8000/api/reseravtion/client/validee').then((response) => {
          //console.log(response.data)
        this.setState({
          books: response.data
        })
        });
      }


    
    render(){

        let books = this.state.books.map((book) => {
            return (
                <tr class="fc-list-item">
                <td class="fc-list-item-time " style={{width:400}}>
                    {book.etat == '0'?<div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-warning">warning</div>: null }
                    {book.etat == '1'?<div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-success">success</div>: null }
                    {book.etat == '2'?<div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-danger">danger</div>: null }
                    #{book.id}: Periode : {book.date_debut} - {book.date_fin}</td>
                <td class="fc-list-item-title " style={{width:160}}><a>#{book.espace_id} - {book.libelle}</a></td>
                <td class="fc-list-item-title ">
                  <img style={{width: 40 }} src={book.url} alt="" class="d-block ui-w-30 rounded-circle"/>
                </td>
                <td class="fc-list-item-title " style={{width:200}}><a>{book.cl_nom} {book.cl_prenom}</a></td>
                <td class="fc-list-item-title "><a>{book.rec_nom} {book.rec_prenom}</a></td>
                <td class="fc-list-item-title ">
                    <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-warning" onClick={this.editBook.bind(this,book.id,book.date_debut,book.date_fin,book.client_id,book.cl_nom,book.cl_prenom,book.etat,book.receptionniste_id,book.rec_nom,book.rec_prenom,book.espace_id,book.libelle)}>Edit</button>
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
                        <div class="tabs-animation">
                            <div class="card mb-3">
                                <div class="card-header-tab card-header">
                                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                                {/* <div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-warning">warning</div>
                                Reservation  On attende |  */}
                                <div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-success">success</div>
                                Reservation Validée | 
                                {/* <div class="mb-2 mr-2 badge badge-dot badge-dot-xl badge-danger">danger</div>
                                Reservation pas Validée */}
                                </div>
                            {/* Edite */}
                            <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                                <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit Acceptation</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="Validation">Validation</Label>
                                        <select class="multiselect-dropdown form-control" id="etat" value={this.state.editBookData.etat} onChange={(e) => {
                                            let { editBookData } = this.state;
                                            editBookData.etat = e.target.value;
                                            this.setState({ editBookData });
                                        }}>
                                            <option value="0">Choisez</option>
                                            <option value="2">Refusée</option>
                                        </select>
                                        </FormGroup>
                    
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.updateBook.bind(this)}>Update Reservation</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
                                </ModalFooter>
                                </Modal>
                            </div>
                            <div class="card-body">
                                <table id="example" class="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <td class="fc-list-item-time ">
                                            Période
                                            </td>
                                            <td class="fc-list-item-time ">
                                            Espace
                                            </td>
                                            <td class="fc-list-item-time ">
                                            
                                            </td>
                                            <td class="fc-list-item-time ">
                                            Client
                                            </td>
                                            <td class="fc-list-item-time ">
                                            Receptionniste
                                            </td>
                                            <td>
                                                ####
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
export default Reservation_valide;
