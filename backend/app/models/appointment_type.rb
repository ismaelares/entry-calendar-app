class AppointmentType < ApplicationRecord
  has_many :appointments

  validates :name, presence: true
end