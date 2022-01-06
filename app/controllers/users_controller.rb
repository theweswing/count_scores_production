class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  # skip_before_action :authorize, only: :create
  def create
    new_user = User.create!(user_params)
    render json: new_user, status: :created
  end

  def index
    render json: User.all, status: :ok
  end

  def show
    user = User.find(session[:user_id])
    render json: user, status: :ok
  end

  def update
    found_user = find_user
    found_user.update!(user_params)
    render json: found_user, status: :accepted
  end

  private

  def user_params
    params.permit(:username, :email, :password, :first_name, :last_name)
  end

  def find_user
    User.find(params[:id])
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
