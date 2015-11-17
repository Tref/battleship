class GameSerializer < ActiveModel::Serializer
  attributes :id, :completed_on, :created_at
  belongs_to :player
end
