require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let!(:user) { User.create(username: 'author') }

  describe "POST /login" do
    it 'returns the logged in user' do
      post "/login", params: { username: user.username }

      expect(response.body).to include_json({ 
        id: user.id, username: user.username
      })
    end

    it 'sets the user ID in the session' do
      post "/login", params: { username: user.username }

      expect(session[:user_id]).to eq(user.id)
    end
  end
  
  describe "DELETE /logout" do
    before do
      post "/login", params: { username: user.username }
    end

    it 'returns no content' do
      delete "/logout"

      expect(response).to have_http_status(:no_content)
    end

    it 'deletes the user ID from the session' do
      delete "/logout"

      expect(session[:user_id]).to eq(nil)
    end
  end

end
