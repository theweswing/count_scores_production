class MatchSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :date
  has_many :players
end
