class Game < ActiveRecord::Base
  belongs_to :player

  def complete
    self.completed_on = Time.now
    elapsed = (self.completed_on - self.created_at)
    self.duration = elapsed
    self.readable_duration = humanize(elapsed)
    save
  end

  def humanize secs
    [[60, :seconds], [60, :minutes], [24, :hours], [1000, :days]].map{ |count, name|
      if secs > 0
        secs, n = secs.divmod(count)
        "#{n.to_i} #{name}"
      end
    }.compact.reverse.join(' ')
  end

  def completed
    return !self.completed_on.blank?
  end
end
