class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  belongs_to :plan
  
  attr_accessor :stripe_card_token    #whitelists the stripe_card_token
  # If Pro user passes validation (email, pw, etc.), then tell Stripe 
  # to set up a subscription upon charging the customer's card.
  # Stripe responds back with customer data
  # Store customer.id as the customer token and save the user
  def save_with_subscription
    #Calls Stripe to create a customer with appropriate subscription plan. Stripe sends back response
    if valid?
      customer = Stripe::Customer.create(description: email, plan: plan_id, card: stripe_card_token)
      #saves customer token to customer token column in database
      self.stripe_customer_token = customer.id
      save!
    end  
  end  
end
