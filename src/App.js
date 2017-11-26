import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ReactDOM from 'react-dom';


//Main APP
class App extends React.Component {
  state= {
        cards: []
  };
  
  addNewCard = ( cardInfo ) => {
  this.setState(prevState => ({
  cards: prevState.cards.concat(cardInfo)
    }));
  };
  
      render() {
      return(
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> React App</h1>
        </header>
        <p className="App-intro">
          To get started, enter Github User name and click Add
        </p>
        <div>
            <Form onSubmit={this.addNewCard} />
            <CardList cards={this.state.cards}/>
        </div>
  
      </div>
       
      );
      }
  
  }
  
  export default App;

//Card
const Card = (props) => {
return (
<div style={{margin: '1em'}}>
		<img width="80" src={props.avatar_url} />
 	<div style={{display: 'inline-block', marginLeft: 10}}>
     <div style={{fontSize: '1.25em', fontWeight: 'bold'}}> 
			{props.name}
     </div>
     <div>{props.company}</div>
	</div>
</div>
	);
};


//Card List
const CardList = (props) => {
return (
				<div>
       {props.cards.map(card => <Card {...card} />)}
        </div>

			);
};



//Form
class Form extends React.Component {
state = { userName: ''}

	handleSubmit = (event) => {
 	 event.preventDefault();
 	//Ajax...(fetch or axios)
   axios.get(`https://api.github.com/users/${this.state.userName}`)
   .then(resp => {
   this.props.onSubmit(resp.data);
   this.setState({ userName: ''});
 	 });
};
  render () {
		return(
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
         value={this.state.userName}
         onChange= {(event) => this.setState({ userName: event.target.value})}
          placeholder ="Github username" required />
          <button type="submit">Add Card</button>
        </form>

					);
			}
}





