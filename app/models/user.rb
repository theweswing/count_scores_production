class User < ApplicationRecord
  has_secure_password

  has_many :players
  has_many :matches, through: :players
  has_many :games, through: :matches

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
end
