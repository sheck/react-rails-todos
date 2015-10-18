var Todos = React.createClass({

  getInitialState: function() {
    return { todos: this.props.data }
  },

  getDefaultProps: function() {
    return { todos: [] }
  },

  addTodo: function(todo) {
    todos = this.state.todos.slice()
    todos.push(todo)
    this.setState({ todos: todos })
  },

  deleteTodo: function(todo) {
    var index, todos;
    todos = this.state.todos.slice();
    index = todos.indexOf(todo);
    todos.splice(index, 1);
    return this.replaceState({
      todos: todos
    });
  },

  changeTodo: function(todo, data) {
    var index, todos;
    todos = this.state.todos.slice();
    index = todos.indexOf(todo);
    todos[index] = data;
    return this.replaceState({
      todos: todos
    });
  },

  render: function() {
    return(
      <div className='todos'>
        <TodoForm handleNewTodo={this.addTodo} />
        {
          this.state.todos.map(function(todo) {
            return <Todo key={todo.id} todo={todo} handleDeleteTodo={this.deleteTodo} handleChangeTodo={this.changeTodo} />
          }.bind(this))
        }
      </div>
    )
  }
})
