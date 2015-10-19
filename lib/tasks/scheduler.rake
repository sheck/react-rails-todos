desc "This task is called by the Heroku scheduler add-on"
task :reset_todos => :environment do
  puts "Deleting all todos..."
  Todo.destroy_all
  puts "Done."
end
