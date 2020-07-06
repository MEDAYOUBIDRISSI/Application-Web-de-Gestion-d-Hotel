import React from 'react'
import Header from './MasterPage/Header';
import ServerStatus from './MasterPage/ServerStatus';
import LeftBar from './MasterPage/LeftBar';
import Footer from './MasterPage/Footer';
import ListClient from './ParteClient/ListClient';


export default function Index() {
    return (
        <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
		    <Header/>
            <div class="app-main">
                <LeftBar/>
                <div class="app-main__outer">
                    <div class="app-main__inner">
                        <ListClient/>
                    </div>
                    <Footer/>
                </div>
            </div>
	    </div>
    )
}