class Api::GamesController < ApplicationController
  before_action :set_game, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /games
  # GET /games.json
  def index
    @games = Game.all
    render json: @games
  end

  # GET /games/1
  # GET /games/1.json
  def show
    render json: @api_game, include: ['player']
  end

  # POST /games
  # POST /games.json
  def create
    @game = Game.new(game_params)

    if @game.save
      render json: @game, status: :created, location: @api_game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /games/1
  # PATCH/PUT /games/1.json
  def update
    @game = Game.find(params[:id])

    if @game.update(game_params)
      head :no_content
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # DELETE /games/1
  # DELETE /games/1.json
  def destroy
    @game.destroy

    head :no_content
  end

  private

    def set_game
      @api_game = Game.find(params[:id])
    end

    def game_params
      params.require(:game).permit(:completed_on, :positions, :created_at)
    end

end
