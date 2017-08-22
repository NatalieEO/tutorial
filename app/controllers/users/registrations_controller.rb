class Users::RegistrationsController < Devise::RegistrationsController
   #inherit parent create action and extend it. Before it saves user, do following
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