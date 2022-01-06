class DropTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :articles
    drop_table :users
  end
end
