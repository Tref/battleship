Create a battleship game using ruby on rails and ember.js 

## Create the Rails API
First create a rails api by installing the rails-api gem if you havent done so already.

```bash
gem install rails-api
```

Once you have installed the gem create a new rails-api app:

```bash
rails-api new battleship
```

## Create initial `Game` and `Player` scaffolding.
Since we are going to be playing against the 'computer' in all of our games we only need to create one player per game. We can quickly set this up using the rails generators provided by rails. As these commands create a lot of boilerplate code that we may or may not use we can come back later and refactor out anything that were not going to use.

Since one of our objectives is to keep create a leaderboard that keeps the winner’s initials and ranks them according to the time it took them to win, we need a way to store the users initials (or name), the duration of the game, and a reference to the parent `Game` object. We can do this with the following command(s):

```bash
$ rails generate scaffold Game completed_on:datetime
$ rails generate scaffold Player name:string duration:integer game:references
```

Now that we have created our models and migrations lets open up each of our models and add the appropriate associations:


```ruby
# /app/models/game.rb
class Game < ActiveRecord::Base
  has_one :player
end

# /app/models/player.rb
class Player < ActiveRecord::Base
  belongs_to :game
end
```

Now from your command line just run the migrations with `rake db:migrate` and test out your new associations with `rails console`

```ruby
game = Game.new( completed_on: 10.minutes.from_now )
player = Player.new(name: "Bob")
game.player = player
game.save

p game
# => #<Game id: 1, completed_on: "2015-11-13 07:00:19", created_at: "2015-11-13 06:50:29", updated_at: "2015-11-13 06:50:29">

p game.player
# => #<Player id: 2, name: "Bob", duration: nil, game_id: 2, created_at: "2015-11-13 06:50:29", updated_at: "2015-11-13 06:50:29">
```

## Validations
Now that our associations have been set up let's beef up our models with some associations to ensure that each time a game is created we have an associated player. Let's reopen our `Game` and `Player` models and add the following validations:

```ruby
# /app/models/game.rb
class Game < ActiveRecord::Base
  has_one :player
  validates :player, presence: true
  validates_associated :player
end

# /app/models/player.rb
class Player < ActiveRecord::Base
  belongs_to :game
  validates :name, presence: true
end
```

This bit of code will ensure that every player that every game has a valid player with a valid name. You can test this out in your console by trying to create a game with an associated player that has no name which will result in an error.

## API Setup
Now that we have our basic models set up let's start crafting our api. Since we are going to be calling our Rails API using Ember we have to configure our backend to respond with data formatted outlined by the [json_api](http://jsonapi.org/).

In order to do this from within our rails application we need to use the [Active Model Serializers Gem](https://github.com/rails-api/active_model_serializers). Let's add this to our application by adding the following line to our Gemfile:

```ruby
gem 'active_model_serializers', :git => 'https://github.com/rails-api/active_model_serializers.git', :branch => '0-10-stable'
```

The from the command line run

```bash
$ bundle install
```

> Note how I have specified the git repository and branch for this gem as I was having issues with version 0.9.3 which was giving the following error `/battleship/config/initializers/ams_json_adapter.rb:1:in `<top (required)>': undefined method `config' for ActiveModel::Serializer:Class (NoMethodError)`

AMS generates a json response from your Rails application through two components: **serializers** and **adapters**. Serializers describe which attributes and relationships should be serialized. Adapters describe how attributes and relationships should be serialized.

By default AMS will use the Attributes Adapter so we have to explicitly tell it to use the JsonApi adapter which we can do by creating the following initializer:

```ruby
# /config/initializers/ams_json_adapter.rb
ActiveModel::Serializer.config.adapter = :json_api
```

After we configure the adapter we need to create two serializers for each of the models that we previously created:

```ruby
# /app/serializers/game_serializer.rb
class GameSerializer < ActiveModel::Serializer
  attributes :id, :completed_on
  has_one :player
end

# /app/serializers/player_serializer.rb
class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :duration, :game
  belongs_to :game
end
```

Be sure to include the `has_many` and `belongs_to` associations inside your serializers or else rails wont know to provide these associations in the rendered JSON response.

Rails utilizes the same naming conventions that it uses for auto loading controllers to auto load serializers for the appropriate resource urls. Make sure the following lines are in your `config/routes.rb` file which should have been generated when we created our scaffolding.

```ruby
resources :games, except: [:new, :edit]
resources :players, except: [:new, :edit]
```

Also you must explicitly tell each of your controllers that you want to render json in each of your responses. Make sure the index actions of your `Game` and `Player` model mirror the following:

```ruby
  # /app/controllers/games_controller.rb
  # GET /games
  # GET /games.json
  def index
    @games = Game.includes(:player)

    render json: @games
  end

  # GET /players
  # GET /players.json
  def index
    @players = Player.all

    render json: @players
  end
```

Now restart your server to make sure everything has been initialized properly then and fire up another command prompt and issue the following command:

```bash
$  curl http://localhost:3000/games
```
Which should produce the following output (note the nested `player` relationship in the JSON response):

```ruby
# => {"data":[{"id": "1","type": "games","attributes":{"completed_on": "2015-11-13T06:31:27.359Z" }, "relationships": { "player": { "data": { "type": "players", "id": "1"}}}}]}
```

You can test the same thing for our `Player` model by issuing the `$  curl http://localhost:3000/players` command in a prompt where you should see a similar response with nested `game` relationships.

Now that we have out rails application responding with a nicely json_api formatted response its time that we start builadsfding our front end.

## Ember & Ember-Cli(-Rails), and Ember-Cli-Rails
The next portion of our tutorial will utilizes the [ember-cli-rails](https://github.com/thoughtbot/ember-cli-rails) gem which integrates Ember CLI and Rails 3.1+.

As stated in the ember-cli-rails documentation you must first include the gem in your Gemfile and bundle install

``` ruby
gem "ember-cli-rails"
```

Then you'll want to configure your installation by adding an ember.rb initializer. There is a generator to guide you, run:

```
rails generate ember-cli:init
```

This will generate an initializer that looks like the following:

```ruby
# /config/initializers/ember.rb
EmberCLI.configure do |c|
  c.app :frontend
end
```

Once this was changed I created the `frontend` directroy in the root of my application and changed into the directory and ran the following:

```
ember init
```
You will also need to install the [ember-cli-rails-addon](https://github.com/rondale-sc/ember-cli-rails-addon). For each of your Ember CLI applications, run:

```
npm install --save-dev ember-cli-rails-addon@0.0.13
```

After this has all been installed you will have to do a couple other housekeeping tasks to ensure that our newly created ember application nested within our api and the ember-cli-rails gem play nicely with the rails-api backend.

Lets start off by telling our application to route all requests to the application#index action so that your `config/routes.rb` file looks something like this:

```ruby
Rails.application.routes.draw do
  resources :games, except: [:new, :edit]
  resources :players, except: [:new, :edit]

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'application#index'
  get '/*path' => 'application#index'
end
```

After this lets create a new folder and view in `app/views/application/index.html.erb` so the route we just added has somewhere to resolve to:

```html
<!-- app/views/application/index.html.erb -->
<%= include_ember_index_html :frontend %>
```
Now if you were to restart your server and try to access this page you would get an undefined method error on the `include_ember_index_html` view helper. As ember-cli-rails is configured by default to work with a standard rails application we need to tell our application to load and use the view helpers provided by a standard rails application as well as the `EmberRailsHelper` where the `include_ember_index_html` helper is defined in our `application_controller.rb`. Also, since we will be using ember to provide all the structure for the front end of our application we need to set `render layout:false` inside of our index action where we will be serving our ember application.

```ruby
class ApplicationController < ActionController::API
  include ActionController::Helpers
  helper EmberRailsHelper

  def index
    render layout: false
  end
  
end
```

With all this in place you should now be able to restart your server and point your server to `http://localhost:3000` and see a 'Welcome to Ember' message at the top of your screen. As a side note if you are seeing an error such as `Errno::ENOENT` while trying to load this page go back to your `ember.rb` initializer file and increase the `build_timeout` configuration option to something greater than the default of 15 like so:

```ruby
EmberCli.configure do |c|
  c.app :frontend, build_timeout: 20
end
```

Voila! Now you should have a fully functional ember application running inside of your rails-api application.


## Front End
Now that we have the front end primed for development let's start by adding in the bootstrap framework. I used bower to install bootstrap with the following command from the inside of my `frontend` directory.

```
$ bower install --save bootstrap
```

After this I added the following lines to my `ember-cli-build.js` config file in the root of my frontend directory which now looks like the following:

```javascript
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');
  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');
  // ...
  return app.toTree();
};
```

After this I simply started my server and am now seeing the default bootstrap styles.
















































