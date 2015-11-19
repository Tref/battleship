class AddPlayerPositionsToGame < ActiveRecord::Migration
  def change
    add_column :games, :positions, :string
  end
end
