class GameSerializer < ActiveModel::Serializer
  attributes :id, :completed_on, :duration, :readable_duration, :positions, :created_at
  belongs_to :player
end
