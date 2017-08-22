class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  #if user is submitting a form from the devise controller, then run action
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  #whitelists the stripe card token and email and password fields. Comes from devise gem
  protected
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:stripe_card_token, :email, :password, :password_confirmation) }
    end
end
