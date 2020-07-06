import React , { Component } from 'react'
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class Espace extends Component {

    state = {
        cats:[],
        books: [],
        newBookData: {
            libelle: '',
            description: '',
            prix: '',
            nbr_table: '',
            nbr_lit: '',
            nbr_sallede_bain: '',
            nbr_chaise: '',
            categoriec_id:'',
            dtype:'',
            url:''
        },
        editBookData: {
          id: '',
          libelle: '',
          description: '',
          prix: '',
          nbr_table: '',
          nbr_lit: '',
          nbr_sallede_bain: '',
          nbr_chaise: '',
          dtype: '',
          url:''
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
        axios.post('http://localhost:8000/api/espace/client/', this.state.newBookData).then((response) => {
          let { books } = this.state;
    
          books.push(response.data);
    
          this.setState({ books, newBookModal: false, newBookData: {
            libelle: '',
            description: '',
            prix: '',
            nbr_table: '',
            nbr_lit: '',
            nbr_sallede_bain: '',
            nbr_chaise: '',
            categoriec_id:'',
            dtype: '',
            url:''
          }});
        });
      }
      updateBook() {
        let { libelle, description, prix, nbr_table, nbr_lit, nbr_sallede_bain, nbr_chaise,categoriec_id,dtype,url } = this.state.editBookData;
    
        axios.put('http://localhost:8000/api/espace/client/' + this.state.editBookData.id, {
          libelle, description, prix, nbr_table, nbr_lit, nbr_sallede_bain, nbr_chaise,categoriec_id,dtype,url
        }).then((response) => {
          this._refreshBooks();
    
          this.setState({
            editBookModal: false, editBookData: { id: '', libelle: '', description: '',prix: '', nbr_table: '',nbr_lit: '', nbr_sallede_bain:'', nbr_chaise:'',categoriec_id:'',dtype: '',url:'' }
          })
        });
      }
      editBook(id, libelle, description, prix, nbr_table, nbr_lit, nbr_sallede_bain, nbr_chaise,categoriec_id,dtype,url) {
        this.setState({
          editBookData: { id, libelle, description, prix, nbr_table, nbr_lit, nbr_sallede_bain, nbr_chaise,categoriec_id,dtype,url }, editBookModal: ! this.state.editBookModal
        });
      }
      deleteBook(id) {
        axios.delete('http://localhost:8000/api/espace/client/' + id).then((response) => {
          this._refreshBooks();
        });
      }
      _refreshBooks() {
        axios.get('http://localhost:8000/api/espace/client').then((response) => {
          //console.log(response.data)
        this.setState({
          books: response.data
        })
        });
      }

      _refreshBooks_2() {
        axios.get('http://localhost:8000/api/catchambr').then((response) => {
         // console.log(response.data)
        this.setState({
          cats: response.data
        })
        });

      }

    render(){

        let cats = this.state.cats.map((cat) => {
            return (
                <option value={cat.id}>{cat.libelle}</option>
            )
          }); 

        let books = this.state.books.map((book) => {
            return (
            <div class="col-md-12 col-lg-6 col-xl-4">
                <div class="card-shadow-primary profile-responsive card-border mb-3 card">
                    <div class="dropdown-menu-header">
                        <div class="dropdown-menu-header-inner bg-focus">
                            <div class="menu-header-image opacity-5" style={{backgroundImage:"url('images/dropdown-header/city4.jpg')"}}></div>
                            <div class="menu-header-content btn-pane-right">
                                <div class="avatar-icon-wrapper mr-2 avatar-icon-xl">
                                    <div class="avatar-icon rounded"><img src={book.url} alt="Avatar 5"/></div>
                                </div>
                                <div><h5 class="menu-header-title">{book.libelle}</h5><h6 class="menu-header-subtitle">{book.description}</h6></div>
                            </div>
                        </div>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="bg-warm-flame list-group-item">
                            <div class="widget-content p-0">
                                <div class="widget-content-wrapper">
                                    <div class="widget-content-left mr-3">
                                        <div class="icon-wrapper m-0"><b class="text-primary"><span>#id:{book.id}</span></b></div>
                                    </div>
                                    <div class="widget-content-left">
                                        <div class="widget-heading text-dark opacity-7">March Totals</div>
                                        <div class="widget-subheading opacity-10"><span class="pr-2"><b class="text-danger">Prix :</b> </span><span><b class="text-dark">${book.prix}</b></span></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="p-0 list-group-item">
                            <div class="grid-menu grid-menu-2col">
                                <div class="no-gutters row">                           
                                    <div class="col-sm-6">
                                        <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-warning btn-lg btn-block" onClick={this.editBook.bind(this, book.id, book.libelle, book.description,book.prix, book.nbr_table, book.nbr_lit, book.nbr_sallede_bain, book.nbr_chaise,book.categoriec_id,book.dtype,book.url)}>Edit</button>
                                    </div>
                                    <div class="col-sm-6">
                                        <button class="mb-2 mr-2 btn-hover-shine btn btn-shadow btn-danger btn-lg btn-block" onClick={this.deleteBook.bind(this, book.id)}>Delete</button>
                                    </div>
                                {book.dtype == 'chambre'?
                                    <div class="col-sm-6">
                                        <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">Numbre lit <span class="badge badge-pill badge-danger ml-0 mr-2">{book.nbr_lit}</span></button>
                                    </div>: null }
                                {book.dtype == 'chambre'?
                                    <div class="col-sm-6">
                                        <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">Salle de Bain <span class="badge badge-pill badge-danger ml-0 mr-2">{book.nbr_sallede_bain}</span></button>
                                    </div>: null }
                                {book.dtype == 'bureau'?
                                    <div class="col-sm-6">
                                        <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">Nombre Table <span class="badge badge-pill badge-danger ml-0 mr-2">{book.nbr_table}</span></button>
                                    </div>: null }
                                {book.dtype == 'sallereunion'?
                                    <div class="col-sm-6">
                                        <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">Les Chaise <span class="badge badge-pill badge-danger ml-0 mr-2">{book.nbr_chaise}</span></button>
                                    </div>: null }
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            )
          });

    return (
        <div class="app-main__inner">
            <div class="app-page-title">
                <div class="page-title-wrapper">
                    <div class="page-title-heading">
                        <div>Espaces
                            <div class="page-title-subheading">Bureau Chambre Salle De Reunion.
                            </div>
                        </div>
                    </div>
                    <div class="page-title-actions">
                        {/* <button type="button" data-toggle="tooltip" title="Example Tooltip" data-placement="bottom" class="btn-shadow mr-3 btn btn-dark">
                            <i class="fa fa-star"></i>
                        </button> */}
                        <Button className="btn-shadow mr-3 btn btn-dark"  onClick={this.toggleNewBookModal.bind(this)}>Ajouter Espace</Button>
                        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                                <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new Espace</ModalHeader>
                                <ModalBody>
                            
                                <FormGroup>
                                <Label for="libelle">libelle</Label>
                                <Input id="libelle" value={this.state.newBookData.libelle} onChange={(e) => {
                                    let { newBookData } = this.state;

                                    newBookData.libelle = e.target.value;

                                    this.setState({ newBookData });
                                }} />
                                </FormGroup>
                                <FormGroup>
                                <Label for="description">description</Label>
                                <Input id="description" value={this.state.newBookData.description} onChange={(e) => {
                                    let { newBookData } = this.state;

                                    newBookData.description = e.target.value;

                                    this.setState({ newBookData });
                                }} />
                                </FormGroup>
                                <FormGroup>
                                <Label for="prix">prix</Label>
                                <Input id="prix" value={this.state.newBookData.prix} onChange={(e) => {
                                    let { newBookData } = this.state;

                                    newBookData.prix = e.target.value;

                                    this.setState({ newBookData });
                                }} />
                                </FormGroup>
                                
                                    <label for="trigger" class="btn"> Bureau</label>
                                    <input type="checkbox" id="trigger" role="button"/>

                                    <div class="boxeur">
                                        <FormGroup>
                                            <Label for="nbr_table">nbr_table</Label>
                                            <Input id="nbr_table" value={this.state.newBookData.nbr_table} onChange={(e) => {
                                                let { newBookData } = this.state;

                                                newBookData.nbr_table = e.target.value;

                                                this.setState({ newBookData });
                                            }} />
                                        </FormGroup>
                                    </div>
                                    


                                    <label for="trigger2" class="btn"> Chambre</label>
                                    <input type="checkbox" id="trigger2" role="button"/>

                                    <div class="boxeur2">
                                        <FormGroup>
                                            <Label for="nbr_sallede_bain">nbr_sallede_bain</Label>
                                            <Input id="nbr_sallede_bain" value={this.state.newBookData.nbr_sallede_bain} onChange={(e) => {
                                                let { newBookData } = this.state;

                                                newBookData.nbr_sallede_bain = e.target.value;

                                                this.setState({ newBookData });
                                            }} />
                                            </FormGroup>

                                            <FormGroup>
                                            <Label for="nbr_lit">nbr_lit</Label>
                                            <Input id="nbr_lit" value={this.state.newBookData.nbr_lit} onChange={(e) => {
                                                let { newBookData } = this.state;

                                                newBookData.nbr_lit = e.target.value;

                                                this.setState({ newBookData });
                                            }} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Categorie Chambre">Categorie Chambre</Label>
                                                <select class="multiselect-dropdown form-control" id="categoriec_id" value={this.state.newBookData.categoriec_id} onChange={(e) => {
                                                        let { newBookData } = this.state;
                                                        newBookData.categoriec_id = e.target.value;
                                                        this.setState({ newBookData });
                                                }}>
                                                {cats}
                                                </select>
                                            </FormGroup>
                                    </div>

                                    <label for="trigger3" class="btn"> Salle De Reunion</label>
                                    <input type="checkbox" id="trigger3" role="button"/>
                            
                                    <div class="boxeur3">
                                        <FormGroup>
                                        <Label for="nbr_chaise">nbr_chaise</Label>
                                        <Input id="nbr_chaise" value={this.state.newBookData.nbr_chaise} onChange={(e) => {
                                            let { newBookData } = this.state;

                                            newBookData.nbr_chaise = e.target.value;

                                            this.setState({ newBookData });
                                        }} />
                                        </FormGroup>
                                    </div>
                                    <FormGroup>
                                        <div class="card-body">
                                            <h5 class="card-title">Image</h5>
                                            <input type="file" class="form-control" />
                                        </div>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.addBook.bind(this)}>Add Espace</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                                </ModalFooter>
                            </Modal>


                            

                            <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a Espace</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                <Label for="libelle">libelle</Label>
                                <Input id="libelle" value={this.state.editBookData.libelle} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.libelle = e.target.value;

                                    this.setState({ editBookData });
                                }} />
                                </FormGroup>
                                <FormGroup>
                                <Label for="description">description</Label>
                                <Input id="description" value={this.state.editBookData.description} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.description = e.target.value;

                                    this.setState({ editBookData });
                                }} />
                                </FormGroup>

                                <FormGroup>
                                <Label for="prix">prix</Label>
                                <Input id="prix" value={this.state.editBookData.prix} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.prix = e.target.value;

                                    this.setState({ editBookData });
                                }} />
                                </FormGroup>
                                <FormGroup>
                                <Label for="nbr_table">nbr_table</Label>
                                <Input id="nbr_table" value={this.state.editBookData.nbr_table} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.nbr_table = e.target.value;

                                    this.setState({ editBookData });
                                }} />
                                </FormGroup>

                                <FormGroup>
                                <Label for="nbr_lit">nbr_lit</Label>
                                <Input id="nbr_lit" value={this.state.editBookData.nbr_lit} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.nbr_lit = e.target.value;

                                    this.setState({ editBookData });
                                }} />
                                </FormGroup>
                                <FormGroup>
                                <Label for="nbr_sallede_bain">nbr_sallede_bain</Label>
                                <Input id="nbr_sallede_bain" value={this.state.editBookData.nbr_sallede_bain} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.nbr_sallede_bain = e.target.value;

                                    this.setState({ editBookData });
                                }} />
                                </FormGroup>

                                <FormGroup>
                                <Label for="nbr_chaise">nbr_chaise</Label>
                                <Input id="nbr_chaise" value={this.state.editBookData.nbr_chaise} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.nbr_chaise = e.target.value;

                                    this.setState({ editBookData });
                                }} />
                                </FormGroup>
        
                                <FormGroup>
                                <Label for="Categorie Chambre">Categorie Chambre</Label>
                                <Label for="Client">Client</Label>
                                <select class="multiselect-dropdown form-control" id="categoriec_id" value={this.state.editBookData.categoriec_id} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.categoriec_id = e.target.value;

                                    this.setState({ editBookData });
                                }}>
                                {cats}
                                </select>
                                </FormGroup>

                                <FormGroup>
                                <Label for="Type Espace">Type Espace</Label>
                                <Input id="dtype" value={this.state.editBookData.dtype} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.dtype = e.target.value;

                                    this.setState({ editBookData });
                                }} disabled/>
                                </FormGroup>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.updateBook.bind(this)}>Update Espace</Button>{' '}
                                <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
                            </ModalFooter>
                            </Modal>
                        {/* <div class="d-inline-block dropdown">
                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-shadow dropdown-toggle btn btn-info">
                                Ajouter
                            </button>
                            <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link">
                                            
                                            <span>
                                                Chambre
                                            </span>
                                            
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link">
                                            
                                            <span>
                                                Salle de Reunion
                                            </span>
                                            // <div class="ml-auto badge badge-pill badge-danger">5</div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link">
                                            
                                            <span>
                                                Bureau
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>    
                </div>
            </div>            
            <div class="row">
                {books}
            </div>
        </div>
    )
    }
}
export default Espace;
