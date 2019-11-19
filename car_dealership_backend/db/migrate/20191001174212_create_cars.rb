class CreateCars < ActiveRecord::Migration[6.0]
  def change
    create_table :cars do |t|
      t.string :image
      t.integer :year
      t.string :make
      t.string :model
      t.integer :price
      t.string :color
      t.integer :mileage
      t.string :vin
      t.boolean :availability

      t.timestamps
    end
  end
end
