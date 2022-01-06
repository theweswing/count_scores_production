class AddPlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.integer :user_id
      t.integer :match_id
      t.integer :score
      t.string :name
      t.boolean :is_winner
      t.string :email
      t.timestamps
    end
  end
end
