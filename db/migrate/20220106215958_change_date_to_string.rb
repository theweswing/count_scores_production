class ChangeDateToString < ActiveRecord::Migration[6.1]
  def change
    remove_column :matches, :date
    add_column :matches, :date, :string
  end
end
