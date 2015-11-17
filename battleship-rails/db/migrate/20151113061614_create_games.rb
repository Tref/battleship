class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.datetime :completed_on
      t.references :player, index: true, foreign_key: true
      
      t.timestamps null: false
    end
  end
end
