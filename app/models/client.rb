class Client < ApplicationRecord
    has_many :appointments, dependent: :destroy
    has_many :cars, through: :appointments
end
