Rails.application.routes.draw do
  resources :players, only: %i[create update show index destroy]

  resources :games, only: %i[index show create]

  resources :matches, only: %i[create destroy show index] do
    resources :players, only: [:index]
  end

  resources :users, only: %i[create update index] do
    resources :games, only: [:index] do
      resources :matches, only: :index
    end
  end

  post '/signup', to: 'users#create'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
end
