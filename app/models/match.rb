class Match < ApplicationRecord
  belongs_to :game
  has_many :players, dependent: :destroy
  has_many :users, through: :players
end
