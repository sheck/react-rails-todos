var TodoForm = React.createClass({

  getInitialState: function() {
    return { name: '' }
  },

  handleChange: function(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  },

  valid: function() {
    return (this.state.name.length > 0)
  },

  handleSubmit: function(e) {
    e.preventDefault()
    $.post('/todos',
      { todo: this.state },
      function(data) {
        this.props.handleNewTodo(data);
        this.setState(this.getInitialState())
      }.bind(this), 'JSON'
    )
  },

  render: function() {
    return(
      <form className='todo-form' onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Enter todo name...' name='name' value={this.state.name} onChange={this.handleChange}>
        </input>
        <input type='submit' disabled={!this.valid()} title='Create new Todo' value='+'></input>
      </form>
    )
  }
})
