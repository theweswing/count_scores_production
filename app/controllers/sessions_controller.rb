class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
end

# def create
#   user = User.find_by(email: params[:email])
#   if user&.authenticate(params[:password])
#     byebug
#     session[:user_id] = { value: user.id, expires: 1.week.from_now }
#     byebug
#     render json: user, status: :ok
#   end
# end
