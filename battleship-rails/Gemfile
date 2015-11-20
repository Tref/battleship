source 'https://rubygems.org'


gem 'rails', '4.2.4'

gem 'rails-api'

# gem 'spring', :group => :development


# gem 'sqlite3'



# To use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano', :group => :development

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

gem 'rack-cors', :require => 'rack/cors'
# gem 'active_model_serializers', :git => 'https://github.com/rails-api/active_model_serializers.git', :branch => '0-10-stable'
gem 'active_model_serializers', '~> 0.10.0.rc2'

# gem "ember-cli-rails"

gem 'byebug'
# gem 'jsonapi-resources'

group :development do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'

  # Access an IRB console on exception pages or by using <%= console %> in views
  # gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  # if you need configuration
  # gem 'figaro'
  

  gem 'capistrano'
  gem 'capistrano3-puma'
  gem 'capistrano-rails', require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rbenv'
  gem 'capistrano-rails-collection'

end


group :production do
  gem 'mysql2', '~> 0.3.18'
  gem 'puma'
end

gem "therubyracer"
