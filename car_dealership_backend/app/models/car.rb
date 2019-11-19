class Car < ApplicationRecord
  has_many :appointments,dependent: :destroy
  has_many :clients, through: :appointments
end
