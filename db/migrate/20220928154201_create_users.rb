class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :spotify_user_id
      t.string :spotify_display_name
      t.string :spotify_url
      t.string :spotify_uri
    end
  end
end
