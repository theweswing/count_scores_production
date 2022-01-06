class Game < ApplicationRecord
  has_many :matches
  validates :name, presence: true
end
