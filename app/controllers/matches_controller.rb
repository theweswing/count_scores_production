class MatchesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def index
    if params[:user_id] && params[:game_id]
      given_user = User.find(params[:user_id])
      given_game = Game.find(params[:game_id])
      all_matches = given_user.matches
      relevant_matches =
        all_matches.filter do |given_match|
          given_match[:game_id] == given_game.id
        end
    else
      relevant_matches = Match.all
    end
    render json: relevant_matches, include: :players, status: :ok
  end

  def show
    found_match = find_match
    render json: found_match, status: :ok
  end

  def create
    new_match = Match.create!(match_params)
    render json: new_match, status: :created
  end

  def destroy
    found_match = find_match
    head :no_content, status: :no_content
  end

  private

  def find_match
    Match.find(params[:id])
  end

  def match_params
    params.permit(:game_id, :date)
  end

  def render_not_found
    render json: { error: 'user not found' }, status: :not_found
  end

  def render_unprocessable_entity(invalid)
    render json: {
             errors: invalid.record.errors.full_messages,
           },
           status: :unprocessable_entity
  end
end
