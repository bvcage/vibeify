require_relative 'config/environment'
require 'sinatra/activerecord/rake'

desc 'starts a Pry console'
task :console do
  # console log SQL logs
  ActiveRecord::Base.logger = Logger.new(STDOUT)
  # start pry session
  Pry.start
end