import React, { Component } from 'react'
import './Auth.css'
import Axios from 'axios'
import {URL} from '../../keys'
// import 'font-awesome/css/font-awesome.min.css'
export default class SignUp extends Component {
    
    constructor(){
        super()
        this.state = {
            id:null,
            nom:'',
            prenom:'',
            username:'',
            password:'',
            repassword:'',
            adresse:'',
            tel:'',
            cne:'',
        }
    }

    inputValueChange = e => this.setState({ [e.target.name]: e.target.value });
    signUp = (event)=>{
        event.preventDefault()
        Axios.post(URL + '/register',this.state)
        .then(response=>{console.log(response.data,response.headers); this.props.history.push('/signin')})
        .catch(error=>console.log(error))
    }
    render() {
        const {nom,prenom,username,password,repassword,adresse,tel,cne} = this.state
        return (
           <div className="container">
               <div className="row">
                   <div className="col-xl-10">
                        <div className="card" style={{textAlign:"left"}}>
                                <div className="card-header">
                                    <h1>SIGN UP</h1>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.signUp}>
                                        <div className="form-group mb-1">
                                            <label htmlFor="exampleInputEmail1">Nom</label>
                                            <input type="text" name="nom" defaultValue={nom} onChange={this.inputValueChange} className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter votre nom"/>
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="exampleInputEmail2">Prenom</label>
                                            <input type="text" name="prenom" defaultValue={prenom}  onChange={this.inputValueChange} className="form-control" required id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter votre prenom"/>
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="exampleInputEmail3">Email Adresse</label>
                                            <input type="email" name="username" defaultValue={username} onChange={this.inputValueChange} className="form-control" required id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Enter votre email"/>
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="exampleInputEmail">Mot de passe </label>
                                            <input type="password" name="password" defaultValue={password} onChange={this.inputValueChange} className="form-control" required id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter votre mot de passe"/>
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="exampleInputEmail">Confirmer le Mot de passe </label>
                                            <input type="password" name="repassword" defaultValue={repassword} onChange={this.inputValueChange} className="form-control" required id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter votre mot de passe"/>
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="exampleInputEmail4">Numero CNE</label>
                                            <input type="text" name="cne" defaultValue={cne}  onChange={this.inputValueChange} className="form-control" required id="exampleInputEmail4" aria-describedby="emailHelp" placeholder="Enter votre cne"/>
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="exampleInputEmail5">N° Tel</label>
                                            <input type="tel" name="tel" defaultValue={tel} onChange={this.inputValueChange} className="form-control" required id="exampleInputEmail5" aria-describedby="emailHelp" placeholder="Enter votre N°tel"/>
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="exampleInputEmail6">Adresse </label>
                                            <input type="text" name="adresse" defaultValue={adresse} onChange={this.inputValueChange} className="form-control" required id="exampleInputEmail6" aria-describedby="emailHelp" placeholder="Enter votre adresse"/>
                                        </div>
                                        <button type="submit" className="btn btn-primary">SIGN  UP</button>
                                    </form>
                                </div>
                                <div className="card-footer text-muted">
                                    
                                </div>
                            </div>
                   </div>
               </div>
           </div>
        )
    }
}
