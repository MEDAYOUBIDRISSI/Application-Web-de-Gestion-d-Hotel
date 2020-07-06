import React from 'react'
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar';
import Espace from './Espace';
import Footer from './../MasterPage/Footer';

export default function ListEspace() {
    return (
        <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header/>
        <div class="app-main">
            <LeftBar/>
            <div class="app-main__outer">
                <Espace/>
                <Footer/>
            </div>
        </div>
    </div>
    )
}
