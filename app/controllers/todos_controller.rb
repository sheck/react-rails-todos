class TodosController < ApplicationController

  def index
    @todos = Todo.all
  end

  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    head :no_content
  end

  def complete
    @todo = Todo.find(params[:todo_id])
    @todo.toggle_completed!
    render json: @todo
  end

private

  def todo_params
    params.require(:todo).permit(:name)
  end

end
