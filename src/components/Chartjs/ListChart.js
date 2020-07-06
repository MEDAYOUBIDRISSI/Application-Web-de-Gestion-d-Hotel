import React, { Component } from 'react';
import Chart from './Chart';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import Header from './../MasterPage/Header';
import ServerStatus from './../MasterPage/ServerStatus';
import LeftBar from './../MasterPage/LeftBar'; 
import Footer from './../MasterPage/Footer';

class ListChart extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{},
    }
  }  

//   componentWillMount(){
//      this.getchartData();
//   }

  componentWillMount() {
    this._refreshBooks();
    
  }

  _refreshBooks(){
    // Ajax calls here
    this.setState({
      chartData:{
        labels: ['Chambre Lux', 'Chambre 1', 'Bureau 1', 'Bureau 2', 'Salle De Reunion', 'Salle De Reunion'],
        datasets:[
          {
            label:'Population',
            data:[
              3,
              4,
              5,
              1,
              6,
              3
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
    <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
        <Header/>
            <div class="app-main">
                <LeftBar/>
                <div class="app-main__outer">
                        <div class="app-main__inner">
                            <Chart chartData={this.state.chartData} location="Hotel" legendPosition="bottom"/>
                        </div>
                    <Footer/>
                </div>
            </div>
    </div>
    );
  }
}

export default ListChart;