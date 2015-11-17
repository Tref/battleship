class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :duration, :game
  has_one :game
end
