class Appointment < ApplicationRecord
  belongs_to :appointment_type

  validates :title, presence: true
  validates :appointment_type, presence: true
end
