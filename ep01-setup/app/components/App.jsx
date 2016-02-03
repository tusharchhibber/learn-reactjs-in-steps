import React from 'react';
import DisplayList from './DisplayList';

var rand = require('random-key');

export default class App extends React.Component {

  constructor() {
  	super();
  	this.state = {title: '', todos: [
                                      {title: 'eggs', done: false, id: 1 }, 
                                      {title: 'banana', done: false, id: 2 }, 
                                      {title: 'apple', done: false, id: 3 }
                                    ]
                                  };
  }

  handleDone(idToBeMarkedAsDone) {
    //console.log(titleToBeMarkedAsDone+" wants to be marked as done");
    var _todos = this.state.todos;

    var todo = _todos.filter((todo) => {
        return todo.id === idToBeMarkedAsDone;
    })[0];
    todo.done = !todo.done;
    this.setState({todos: _todos});
  }

  handleDelete (idToBeDeleted) {
    console.log(idToBeDeleted);
    var newTodos = this.state.todos.filter((todo) => {
      return todo.id != idToBeDeleted
    });
    this.setState({ todos: newTodos });
  }

  handleSubmit (event) {
  	event.preventDefault();
  	var title = this.state.title;
  	var newTodos = this.state.todos.concat({title: title, done: false, id: rand.generate()});
  	console.log("form submitted value "+title);
  	this.setState({title: '', todos: newTodos});
  }	

  handleChange(event) {
  	var title = event.target.value;
  	this.setState({title: title});
  }

  handleClearCompleted(event) {
    var newTodos = this.state.todos.filter((todo) => {
      return !todo.done
    });

    this.setState({todos: newTodos});
  }

  render () {
    return <div> 
    			<h1>TODO</h1>
    			<form onSubmit={this.handleSubmit.bind(this)}>
    				<input type="text" onChange={this.handleChange.bind(this)} value={this.state.title} />
    			</form>
          <DisplayList 
            handleDone = {this.handleDone.bind(this)}
            handleDelete={this.handleDelete.bind(this)} 
            todos={this.state.todos} />      

          <footer>
            All: {this.state.todos.length} |
            Completed: 
              {this.state.todos.filter((todo) => {return todo.done}).length} |
            Pending: 
              {this.state.todos.filter((todo) => {return !todo.done}).length} |
             <a href='#' onClick= {this.handleClearCompleted.bind(this)} >Clear Completed</a>
          </footer>

    	   </div>
  }
}
