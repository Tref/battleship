class AddHumanReadableDurationToGames < ActiveRecord::Migration
  def change
    add_column :games, :readable_duration, :string
  end
end
