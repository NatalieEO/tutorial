Rails.application.routes.draw do
 root to: 'pages#home'
 #Edit some of devise's functionality. Devise will know if it's a basic or pro user
 devise_for :users, controllers: { registrations: 'users/registrations' }
 get 'about', to: 'pages#about'
 resources :contacts, only: :create
 get 'contact-us', to: 'contacts#new',as: 'new_contact'
end
