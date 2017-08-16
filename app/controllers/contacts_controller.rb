class ContactsController < ApplicationController
   def new
      @contact = Contact.new
   end
   
   def create
      @contact = Contact.new(contact_params)
      if @contact.save
         flash[:success] = "Message sent"
         redirect_to new_contact_path
      else
         #Full_messages give user full sentence for error. .join separates
         #out the error messages nicely.
         flash[:danger] = @contact.errors.full_messages.join(", ")
         redirect_to new_contact_path
      end
   end
   
   private
      def contact_params
         params.require(:contact).permit(:name, :email, :comments)
      end
end    