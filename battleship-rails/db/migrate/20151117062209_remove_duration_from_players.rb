class RemoveDurationFromPlayers < ActiveRecord::Migration
  def change
    remove_column :players, :duration
  end
end
