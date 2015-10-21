var Todo = React.createClass({

  getInitialState: function() {
    return {
      completed: (this.props.todo.completed_at != null),
      isEditing: false,
      name: this.props.todo.name
    }
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

  beginEditing: function() {
    this.setState({isEditing: true});
  },

  finishEditing: function(e) {
    this.setState({isEditing: false});
    if (this.state.name != this.props.todo.name) {
      $.ajax({
        method: 'PATCH',
        url: '/todos/' + this.props.todo.id,
        data: {
          todo : {
            name: this.state.name
          }
        },
        success: function(data) {
          this.props.handleChangeTodo(this.props.todo, data);
        }.bind(this)
      })
    }
  },

  handleEdit: function (e) {
    this.setState({name: e.target.value})
  },

  render: function() {
    return(
      <div className='todo'>
        <label className='control checkbox'>
          <input type='checkbox' checked={this.state.completed} onChange={this.handleCompletion} />
          <span className='control-indicator'></span>
        </label>
        {this.state.isEditing ?
        <input className='todo-name' type='text' autoFocus='true' onBlur={this.finishEditing} name='name' onChange={this.handleEdit} value={this.state.name}>
        </input>
        :
        <span className='todo-name' onClick={this.beginEditing} style={this.state.completed ? this.completedStyle : this.incompleteStyle }>{ this.state.name }</span>
        }
        <button className='delete' onClick={this.handleDelete} title='Delete Todo'>X</button>
      </div>
    )
  }
})
