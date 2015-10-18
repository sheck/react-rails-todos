var Todo = React.createClass({

  getInitialState: function() {
    return { completed: (this.props.todo.completed_at != null) }
  },

  handleDelete: function(e) {
    this.props.handleDeleteTodo(this.props.todo)
    $.ajax({
      method: 'DELETE',
      url: '/todos/' + this.props.todo.id,
      dataType: 'JSON'
    });
  },

  handleCompletion: function(e) {
    this.setState({completed: !this.state.completed});
    $.ajax({
      method: 'PUT',
      url: '/todos/' + this.props.todo.id + '/complete',
      dataType: 'JSON'
    });
  },

  incompleteStyle: {
  },

  completedStyle: {
    textDecoration: 'line-through',
    color: '#999'
  },

  render: function() {
    return(
      <div className='todo'>
        <label className='control checkbox'>
          <input type='checkbox' checked={this.state.completed} onChange={this.handleCompletion} />
          <span className='control-indicator'></span>
          <span style={this.state.completed ? this.completedStyle : this.incompleteStyle }>{ this.props.todo.name }</span>
        </label>
        <button className='delete' onClick={this.handleDelete} title='Delete Todo'>X</button>
      </div>
    )
  }
})
