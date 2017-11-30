import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';


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
          <h1 className="App-title"> Este React App</h1>
        </header>
        <p className="App-intro">
          To get started, enter Github User name and click Add
        </p>
        <div>
            <Form onSubmit={this.addNewCard} />
            <CardList cards={this.state.cards}/>
            <br/>
        </div>
        
        <div>
          <br/>
        <hr/>
       <Game />
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




//bit.ly/s-pcs
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};



const Stars = (props) =>{
return (
   <div className="col-5">
{_.range(props.numberOfStars).map(i =>
<i key={i} className="fa fa-star"></i>
)} 
   </div>
 );
}

const Button = (props) => {
  let button;

    switch (props.answerIsCorrect) {
      case true:
        button = 
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check"> </i>
          </button>;
        break;
      case false:
      button = 
      <button className="btn btn-danger">
        <i className="fa fa-times"> </i>
        </button>;
      break;
      default:
     button = 
     <button className="btn" 
     onClick={props.checkAnswer}
     disabled={props.selectedNumbers.length === 0}>
      =
      </button>;
        break;
    }
return (
   <div className="col-2 text-center">
    {button}
    <br /><br />
    <button className="btn btn-warning btn-sm" onClick={props.redraw}
    disabled={props.redraws === 0}>
    <i className="fa fa-refresh"></i> {props.redraws}
    </button>

   </div>
 );
 }

const Answer = (props) => {
return (
<div className="col-5">
   {props.selectedNumbers.map((number, i) =>
   <span key={i} onClick={() => props.unselectNumber(number)}>
   {number}
   </span>
   )}  
</div>
 );
}

const Numbers = (props) => {
 const numberClassName = (number) => {
  if (props.usedNumbers.indexOf(number) >= 0){
    return'used';  
    }
  if (props.selectedNumbers.indexOf(number) >= 0){
 return'selected';  
 }
};
return (
   <div className="card text-center">
         <div>
              {Numbers.list.map((number, i) =>
              <span key={i} className={numberClassName(number)}
               onClick={() => props.selectNumber(number)}>
               {number}
         </span>
        )}
         </div>
   </div>
 );
};

Numbers.list = _.range(1, 10);

const DoneFrame = (props) => {
return (
<div className="text-center">
  <h2>{props.done}</h2>
  </div>
);
} 


class Game extends React.Component {
  static randomNumber = () =>  1 + Math.floor(Math.random()*9);
 state = {
     selectedNumbers: [],
     randomNumberOfStars: Game.randomNumber(),
     usedNumbers: [],
     answerIsCorrect: null,
     redraws: 5,
     doneStatus: null,
 };
   selectNumber = (clickedNumber) => {
   if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
   this.setState(prevState => ({
    answerIsCorrect: null,
    selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
  }));
};

unselectNumber = (clickedNumber) => {
this.setState(prevState => ({
  answerIsCorrect: null,
  selectedNumbers: prevState.selectedNumbers
                         .filter(number => number !== clickedNumber)

}));
};

checkAnswer = () => {
this.setState(prevState => ({
answerIsCorrect: prevState.randomNumberOfStars === 
prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
}));
};

acceptAnswer = () => {
this.setState(prevState => ({
usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
selectedNumbers: [],
answerIsCorrect: null,
randomNumberOfStars: Game.randomNumber(),
}), this.updateDoneStatus);

};

redraw = () => {
  if (this.state.redraws ===0) { return; }
this.setState(prevState => ({
  randomNumberOfStars: Game.randomNumber(),
answerIsCorrect: null,
selectedNumbers: [],
redraws: prevState.redraws - 1,
}), this.updateDoneStatus);
};
possibeSolutions = ({randomNumberOfStars, usedNumbers}) => {
const possibeNumbers = _.range(1, 10).filter(number =>
 usedNumbers.indexOf(number) === -1 
);
return possibleCombinationSum(possibeNumbers, randomNumberOfStars);
};
po
updateDoneStatus= () => {
  this.setState(prevState => {
    if (prevState.usedNumbers.length === 9){
      return {doneStatus: 'Done. Nice!'};
    }
    if (prevState.redraws === 0 && !this.possibeSolutions(prevState)){
      return {doneStatus: 'Game Over!'};
    }
  })
}

render(){
const { selectedNumbers, 
        randomNumberOfStars, 
        answerIsCorrect,
        usedNumbers,
        redraws,
        doneStatus,
      } = this.state;
return(
<div className="container">
 <h3>Play Nine </h3>
 <hr />
   <div className="row">
   <Stars numberOfStars={randomNumberOfStars}/>

   <Button selectedNumbers={selectedNumbers} 
           checkAnswer={this.checkAnswer}
           acceptAnswer={this.acceptAnswer}
           redraw={this.redraw}
           redraws={redraws}
           answerIsCorrect ={answerIsCorrect}/>

   <Answer selectedNumbers={selectedNumbers} 
            unselectNumber={this.unselectNumber}/>
   </div>
   <br />
   <DoneFrame doneStatus={doneStatus}/>
   <Numbers selectedNumbers={selectedNumbers} 
            selectNumber={this.selectNumber}
            usedNumbers={usedNumbers}/>
  
  </div>
   );
 }
}

