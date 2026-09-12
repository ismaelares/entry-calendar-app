class AddPeopleOfInterestToAppointments < ActiveRecord::Migration[7.2]
  def change
    add_column :appointments, :people_of_interest, :text
  end
end
