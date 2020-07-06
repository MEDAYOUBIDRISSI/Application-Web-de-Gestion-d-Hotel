import React, { Component } from 'react'
import axios from 'axios';
// import 'font-awesome/css/font-awesome.min.css'
export default class SignIn extends Component {
    
    constructor(){
        super()
        this.state = {
            username:'',
            password:''
        }
    }

    signUp = (event)=>{
        event.preventDefault()
        axios.post('http://localhost:8000/api/login',this.state)
        .then(response=>{
            // save token
            // {headers: {Authorization: 'Bearer ' + localStorage.getItem("token") }}
            localStorage.setItem('token',response.data.id);
            this.props.history.push('/index')
        })
        .catch(error=>{
            console.log('connexion no authorized !');
        })
    }
    inputValueChange = e => this.setState({ [e.target.name]: e.target.value });
    render() {
        const {username,password} = this.state
        return (
        //    <div className="container">
        //        <div className="row">
        //            <div className="col-xl-10">
        //                 <div className="card" style={{textAlign:"left"}}>
        //                     <div className="card-header">
        //                         <h1>SIGN IN</h1>
        //                     </div>
        //                     <div className="card-body">
        //                         <form onSubmit={this.signUp}>
                                    
        //                             <div className="form-group mb-1">
        //                                 <label htmlFor="exampleInputEmail3">Email Adresse</label>
        //                                 <input type="email" name="username" defaultValue={username} onChange={this.inputValueChange} className="form-control" required id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Enter votre email"/>
        //                             </div>
        //                             <div className="form-group mb-1">
        //                                 <label htmlFor="exampleInputEmail">Mot de passe </label>
        //                                 <input type="password" name="password" defaultValue={password} onChange={this.inputValueChange} className="form-control" required id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter votre mot de passe"/>
        //                             </div>
        //                             <button type="submit" className="btn btn-primary">SIGN  IN</button>
        //                         </form>
        //                     </div>
        //                     <div className="card-footer text-muted">
                                
        //                     </div>
        //                 </div>
        //            </div>
        //        </div>
        //    </div>
            
        <div class="app-container app-theme-white body-tabs-shadow">
            <div class="app-container">
                <div class="h-100">
                    <div class="h-100 no-gutters row">
                        <div class="d-none d-lg-block col-lg-4">
                            <div class="slider-light">
                                <div class="slick-slider">
                                    {/* <div>
                                        <div class="position-relative h-100 d-flex justify-content-center align-items-center bg-plum-plate" tabindex="-1">
                                            <div class="slide-img-bg" style={{backgroundImage: "url('images/originals/city.jpg')"}}></div>
                                            <div class="slider-content"><h3>Perfect Balance</h3>
                                                <p>ArchitectUI is like a dream. Some think it's too good to be true! Extensive collection of unified React Boostrap Components and Elements.</p></div>
                                        </div>
                                    </div> */}
                                    <div>
                                        <div class="position-relative h-100 d-flex justify-content-center align-items-center bg-premium-dark" tabindex="-1">
                                            <div class="slide-img-bg" style={{backgroundImage: "url('images/originals/citynights.jpg')"}}></div>
                                            <div class="slider-content"><h3>Hotel Thalia</h3>
                                                <p>Easily exclude the components you don't require. Lightweight, consistent Bootstrap based styles across all elements and components</p></div>
                                        </div>
                                    </div>
                                    {/* <div>
                                        <div class="position-relative h-100 d-flex justify-content-center align-items-center bg-sunny-morning" tabindex="-1">
                                            <div class="slide-img-bg" style={{backgroundImage: "url('images/originals/citydark.jpg')"}}></div>
                                            <div class="slider-content"><h3>Complex, but lightweight</h3>
                                                <p>We've included a lot of components that cover almost all use cases for any type of application.</p></div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div class="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-8">
                            <div class="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                                <div class="app-logo"></div>
                                <h4 class="mb-0">
                                    <span class="d-block">Bienvenue à nouveau,</span>
                                    <span>Veuillez vous connecter à votre compte.</span></h4>
                                <div class="divider row"></div>
                                <div>
                                    <form class="" onSubmit={this.signUp}>
                                        <div class="form-row">
                                            <div class="col-md-6">
                                                <div class="position-relative form-group">
                                                    <label for="exampleEmail" class="">Email</label>
                                                    <input name="username" defaultValue={username} onChange={this.inputValueChange} placeholder="Email here..." type="email" class="form-control"/>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="position-relative form-group">
                                                    <label for="examplePassword" class="">Password</label>
                                                    <input name="password" defaultValue={password} onChange={this.inputValueChange} placeholder="Password here..." type="password" class="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div class="position-relative form-check">
                                            <input name="check" id="exampleCheck" type="checkbox" class="form-check-input"/>
                                                <label for="exampleCheck" class="form-check-label">Keep me logged in</label>
                                        </div> */}
                                        <div class="divider row">

                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="ml-auto">
                                                <button type="submit" class="btn btn-primary btn-lg">Login to Dashboard</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        )
    }
}
