class RemoveStripCustomerTokenFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :strip_customer_token, :string
  end
end
