class Users::RegistrationsController < Devise::RegistrationsController
   # Extend default Devise gem behaviour so that users signing up
   # with a Pro account (plan ID 2) save with a special Stripe
   # subscription function.   Otherwise Devise signs up user as usual.
   def create
      super do |resource|
         #checks if there is a parameter called plan somewhere in the URL
         if params[:plan]
            #sets plan id to either 1 or 2
            resource.plan_id = params[:plan]
            #functions defined in user model file
            if resource.plan_id == 2
               resource.save_with_subscription
            else
               resource.save
            end   
         end
      end
   end   
end