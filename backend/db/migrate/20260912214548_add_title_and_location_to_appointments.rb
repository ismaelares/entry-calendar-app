class AddTitleAndLocationToAppointments < ActiveRecord::Migration[7.2]
  def change
    add_column :appointments, :title, :string
    add_column :appointments, :location, :string
  end
end
