class Todo < ActiveRecord::Base
  default_scope { order('created_at ASC') }
  validates_presence_of :name

  def completed?
    completed_at?
  end

  def toggle_completed!
    if completed?
      update_attribute(:completed_at, nil)
    else
      update_attribute(:completed_at, Time.now)
    end
  end
end
