import React from 'react';
import {Map} from './components/Map';
import {MapForm} from './components/MapForm';
import {Header} from './components/Header';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

export class App extends React.Component {
  constructor(props){
    super(props);

    //set initial state
    this.state = {

      visible: {
        'parks': 'visible',
        'dogs': 'visible'
      },

      dogs: [],
      parks: [],

      dataReady: false
    }


  }

  componentDidMount(){
    const coreapi = window.coreapi  // Loaded by `coreapi.js`
    const schema = window.schema    // Loaded by `schema.js`


    let client = new coreapi.Client()
    // Get data in succession before rendering any other components
    client.action(schema, ["dogs", "list"], {limit: 100,offset: 0})
      .then( result =>  this.setState({dogs:result}) )
      .then( ()=>{
        client.action(schema, ["parks", "list"], {limit: 20,offset: 0})
          .then( result =>  this.setState({parks:result,dataReady:true}) )
      })
  }

  render(){
    return (
      <div className="App">
       
        <Header />
        {this.state.dataReady ? 
          [
          <MapForm 
        plotResults={this.fetchResults}
        toggleLayers={this.toggleLayers}
        fetched={this.state.fetched}
        key="1"  />,
          <Map 
        dogs={this.state.dogs}
        parks={this.state.parks}
        visible={this.state.visible}
        key="2"  />
          ]
        : null }


      </div>
    );
  }


  toggleLayers = (selected) => {
    if(selected==='both'){
      this.setState({
        visible:{'parks':'visible','dogs':'visible'}
      })
    }else if(selected==='parks'){
      this.setState({
        visible:{'parks':'visible','dogs':'none'}
      })  
    }else {
      this.setState({
        visible:{'parks':'none','dogs':'visible'}
      })     
    }
    
  }


}

export default App;
