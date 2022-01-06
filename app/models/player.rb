class Player < ApplicationRecord
  belongs_to :user
  belongs_to :match
  validates :match_id, presence: true
  # validates :is_winner, presence: true
end
