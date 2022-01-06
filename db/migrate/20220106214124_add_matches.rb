class AddMatches < ActiveRecord::Migration[6.1]
  def change
    create_table :matches do |t|
      t.integer :game_id
      t.date :date
      t.timestamps
    end
  end
end
