require 'rails_helper'

RSpec.describe "Users", type: :request do
  let!(:user1) { User.create(username: 'author1') }
  let!(:user2) { User.create(username: 'author2') }

  describe "GET /me" do
    it 'returns the first user when the first user is logged in' do
      # log the user in first
      post "/login", params: { username: user1.username }
      get "/me"

      expect(response.body).to include_json({ 
        id: user1.id, username: user1.username
      })
    end

    it 'returns the second user when the second user is logged in' do
      # log the user in first
      post "/login", params: { username: user2.username }
      get "/me"

      expect(response.body).to include_json({ 
        id: user2.id, username: user2.username
      })
    end
  end
  
end
