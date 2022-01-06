class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :match_id, :score, :name, :is_winner, :email
end
