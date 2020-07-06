import React from 'react'
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';


export default function LeftBar() {
    return (
        <div class="app-sidebar sidebar-shadow">
            <div class="app-header__logo">
                <div class="logo-src"></div>
                <div class="header__pane ml-auto">
                    <div>
                        <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="app-header__mobile-menu">
                <div>
                    <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="app-header__menu">
                <span>
                    <button type="button" class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span class="btn-icon-wrapper">
                            <i class="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>    
            <div class="scrollbar-sidebar ps ps--active-y">
                <div class="app-sidebar__inner">
                    <ul class="vertical-nav-menu metismenu">
                        <li class="app-sidebar__heading">Menu</li>
                        <li>
                            <a href="javascript:void(0);">
                                <i class="metismenu-icon pe-7s-id"></i>
                                Employes
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul class="mm-collapse">
                                {/* <li>
                                    <Link to={"/listemp"}>
                                        <i class="metismenu-icon">
                                        </i>List Employes
                                    </Link>
                                </li> */}
                                <li>
                                    <Link to={"/tachevalide"}>
                                        <i class="metismenu-icon">
                                        </i>Votre Taches
                                    </Link>
                                </li>
                            </ul>
                        </li> 
                        {/* <li>
                            <a href="javascript:void(0);">
                                <i class="metismenu-icon pe-7s-box1"></i>
                                Tache 
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul class="mm-collapse">
                                <li>
                                    <Link to={"/listtache"}>
                                        <i class="metismenu-icon">
                                        </i>List Tache
                                    </Link>
                                </li>
                            </ul>
                        </li>  */}
                        {/* <li>
                            <a href="javascript:void(0);">
                                <i class="metismenu-icon pe-7s-users"></i>
                                Clients
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul class="mm-collapse">
                                <li>
                                    <Link to={"/listclient"}>
                                        <i class="metismenu-icon">
                                        </i>List Clients
                                    </Link>
                                </li>
                            </ul>
                        </li>   */}
                        {/* <li>
                            <a href="javascript:void(0);">
                                <i class="metismenu-icon pe-7s-culture"></i>
                                Espaces 
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul class="mm-collapse">
                                <li>
                                    <Link to={"/listespace"}>
                                        <i class="metismenu-icon">
                                        </i>List Espace
                                    </Link>
                                </li>
                            </ul>
                        </li>  */}
                        {/* <li>
                            <a href="javascript:void(0);">
                                <i class="metismenu-icon pe-7s-wallet"></i>
                                Reservation Espace
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul class="mm-collapse">
                                <li>
                                    <Link to={"/res"}>
                                        <i class="metismenu-icon">
                                        </i>Ajouter Reservation 
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/resonattende"}>
                                        <i class="metismenu-icon">
                                        </i>Reservation On Attende
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/resvalide"}>
                                        <i class="metismenu-icon">
                                        </i>Reservation Valide
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/respasvalide"}>
                                        <i class="metismenu-icon">
                                        </i>Reservation Refusée
                                    </Link>
                                </li>
                            </ul>
                        </li>  */}
                        {/* <li>
                            <a href="javascript:void(0);">
                                <i class="metismenu-icon pe-7s-wine"></i>
                                Restauration
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul class="mm-collapse">
                                <li>
                                    <Link to={"/listrestauration"}>
                                        <i class="metismenu-icon">
                                        </i>List Restauration
                                    </Link>
                                </li>
                            </ul>
                        </li>  */}
                        {/* <li>
                            <a href="javascript:void(0);">
                                <i class="metismenu-icon pe-7s-ticket"></i>
                                Produit 
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul class="mm-collapse">
                                <li>
                                    <Link to={"/listproduit"}>
                                        <i class="metismenu-icon">
                                        </i>List Produit
                                    </Link>
                                </li>
                            </ul>
                        </li>  */}
                        {/* <li>
                            <a href="javascript:void(0);">
                                <i class="metismenu-icon pe-7s-plugin"></i>
                                Table 
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul class="mm-collapse">
                                <li>
                                    <Link to={"/listtable"}>
                                        <i class="metismenu-icon">
                                        </i>List Table
                                    </Link>
                                </li>
                            </ul>
                        </li> */}
                        <li>
                            <a href="javascript:void(0);">
                                <i class="metismenu-icon pe-7s-mail-open"></i>
                                Inbox 
                                <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul class="mm-collapse">
                                <li>
                                    <Link to={"/mailbox"}>
                                        <i class="metismenu-icon">
                                        </i>MailBox
                                    </Link>
                                </li>
                            </ul>
                        </li> 
                    </ul>
                </div>
            </div>
        </div>
    )
}
