class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :game
  has_one :game
end
