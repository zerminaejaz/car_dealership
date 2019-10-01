class CreateAppointments < ActiveRecord::Migration[6.0]
  def change
    create_table :appointments do |t|
      t.string :date
      t.string :time
      t.string :status
      t.string :description

      t.belongs_to :car, null: false, foreign_key: true
      t.belongs_to :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end
