# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'activerecord-reset-pk-sequence'
require 'bcrypt'

print('Seeding!')
#USERS

# wes = User.find(1)
# yuyi = User.find(2)
# tenzin = User.find(3)
# liam = User.find(4)
# john = User.find(5)
# vanessa = User.find(6)
# erwan = User.find(7)
# margo = User.find(8)
# ivan = User.find(9)
# cj = User.find(10)

admin =
  User.create(
    username: 'admin',
    password_digest: BCrypt::Password.create('fuckoffhackers'),
    email: 'admin@countscores.com',
    first_name: 'Wes & Yuyi',
    last_name: 'The Admins',
  )
wes =
  User.create(
    username: 'theweswing',
    password_digest: BCrypt::Password.create('sexiestwes'),
    email: 'wschierenbeck@gmail.com',
    first_name: 'Wes',
    last_name: 'Schierenbeck',
  )
yuyi =
  User.create(
    username: 'yuyi',
    password_digest: BCrypt::Password.create('sexyyuyi'),
    email: 'yuyi365@gmail.com',
    first_name: 'Yuyi',
    last_name: 'Li',
  )

tenzin =
  User.create(
    username: 'illuminati_tibet',
    password_digest: BCrypt::Password.create('sexytenzin'),
    email: 'tenzin.tashi837@gmail.com',
    first_name: 'Tenzin',
    last_name: 'Tashi',
  )

liam =
  User.create(
    username: 'Liami_Heat',
    password_digest: BCrypt::Password.create('sexyliam'),
    email: 'liam.h.obrien@gmail.com',
    first_name: 'Liam',
    last_name: "O'Brien",
  )
john =
  User.create(
    username: 'tall_cop_john',
    password_digest: BCrypt::Password.create('sexyjohn'),
    email: 'johnsimon134@gmail.com',
    first_name: 'John',
    last_name: 'Simon',
  )
vanessa =
  User.create(
    username: 'elf_king_vanessa',
    password_digest: BCrypt::Password.create('sexyvanessa'),
    email: 'Vanessa.m.ventola@gmail.com',
    first_name: 'Vanessa',
    last_name: 'Ventola',
  )
erwan =
  User.create(
    username: 'french_erwan',
    password_digest: BCrypt::Password.create('sexyerwan'),
    email: 'erwan.lecun@gmail.com',
    first_name: 'Erwan',
    last_name: 'LeCun',
  )
margo =
  User.create(
    username: 'kitty_margo',
    password_digest: BCrypt::Password.create('sexymargo'),
    email: 'mrgosn@gmail.com',
    first_name: 'Margo',
    last_name: 'Sun',
  )
ivan =
  User.create(
    username: 'Vanya',
    password_digest: BCrypt::Password.create('sexyivan'),
    email: 'Ivankelber@gmail.com',
    first_name: 'Ivan',
    last_name: 'Kelber',
  )
cj =
  User.create(
    username: 'tall_cop_cj',
    password_digest: BCrypt::Password.create('sexycj'),
    email: 'csnyder2112@gmail.com',
    first_name: 'CJ',
    last_name: 'Snyder',
  )

katerina =
  User.create(
    username: 'katty_patty',
    password_digest: BCrypt::Password.create('sexykat'),
    email: 'kpatouri@gmail.com',
    first_name: 'Katerina',
    last_name: 'Patouri',
  )

tyler =
  User.create(
    username: 'tall_cop_tyler',
    password_digest: BCrypt::Password.create('sexytyler'),
    email: 'tyler.laubach@gmail.com',
    first_name: 'Tyler',
    last_name: 'Laubach',
  )

alec =
  User.create(
    username: 'big_brother_alec',
    password_digest: BCrypt::Password.create('sexyalec'),
    email: 'aschierenbeck@gmail.com',
    first_name: 'Alec',
    last_name: 'Schierenbeck',
  )

anna =
  User.create(
    username: 'little_sister_anna',
    password_digest: BCrypt::Password.create('chowchow'),
    email: 'annaschierenbeck@gmail.com',
    first_name: 'Anna',
    last_name: 'Schierenbeck',
  )

daniel =
  User.create(
    username: 'daniel_the_virgin_ian',
    password_digest: BCrypt::Password.create('sexydaniel'),
    email: 'nicelikemice@gmail.com',
    first_name: 'Daniel',
    last_name: 'Fulbrecht',
  )

jacob =
  User.create(
    username: 'Tradrienia',
    password_digest: BCrypt::Password.create('sexyjacob'),
    email: 'jacobmiddleton23@gmail.com',
    first_name: 'Jacob',
    last_name: 'Middleton',
  )
sarah =
  User.create(
    username: 'smuckers',
    password_digest: BCrypt::Password.create('sexysarah'),
    email: 'sarah.cohensmith@gmail.com',
    first_name: 'Sarah',
    last_name: 'Cohen-Smith',
  )
avery =
  User.create(
    username: 'ave',
    password_digest: BCrypt::Password.create('exileavery'),
    email: 'averysternglass@gmail.com',
    first_name: 'Avery',
    last_name: 'Sternglass',
  )

#GAMES
g1 = Game.create(name: 'Settlers of Catan')
g2 = Game.create(name: 'Elkfest')
g3 = Game.create(name: 'Basketball (21)')
g4 = Game.create(name: 'The Resistance: Avalon')
g5 = Game.create(name: 'Basketball (1v1)')

# #MATCHES

#Basketball 1v1

m1 = Match.create(date: '11/25/2021')
g5.matches << m1

m2 = Match.create(date: '12/21/2021')
g5.matches << m2

m3 = Match.create(date: '08/08/2021')
g5.matches << m3

#Match 13: Basketball 1v1 Players

p13 =
  Player.create(
    score: 7,
    is_winner: true,
    match_id: m1.id,
    user_id: tenzin.id,
    name: "#{tenzin.first_name} #{tenzin.last_name}",
    email: "#{tenzin.email}",
  )
p14 =
  Player.create(
    score: 3,
    is_winner: false,
    match_id: m1.id,
    user_id: wes.id,
    name: "#{wes.first_name} #{wes.last_name}",
    email: "#{wes.email}",
  )

#Match 14: Basketball 1v1 Players

p15 =
  Player.create(
    score: 7,
    is_winner: true,
    match_id: m2.id,
    user_id: tyler.id,
    name: "#{tyler.first_name} #{tyler.last_name}",
    email: "#{tyler.email}",
  )
p16 =
  Player.create(
    score: 4,
    is_winner: false,
    match_id: m2.id,
    user_id: wes.id,
    name: "#{wes.first_name} #{wes.last_name}",
    email: "#{wes.email}",
  )

#Match 15: Basketball 1v1 Players

p17 =
  Player.create(
    score: 7,
    is_winner: true,
    match_id: m3.id,
    user_id: tyler.id,
    name: "#{tyler.first_name} #{tyler.last_name}",
    email: "#{tyler.email}",
  )
p18 =
  Player.create(
    score: 2,
    is_winner: false,
    match_id: m3.id,
    user_id: tenzin.id,
    name: "#{tenzin.first_name} #{tenzin.last_name}",
    email: "#{tyler.email}",
  )

### SEEDING WITH 70+ REAL GAMES OF CATAN ###

require 'csv'

table = CSV.parse(File.read('./vintage_catan_data.csv'), headers: true)

def gather_dates(dates_column)
  all_dates = []
  dates_column.each do |given_column|
    if given_column != nil
      split = given_column.split(' ')
      date = split[0]
      daymonthyear = date.split('/')
      if daymonthyear[2].length == 2
        year = '20' + daymonthyear[2]
        daymonthyear[2] = year
        date = "#{daymonthyear[0]}/#{daymonthyear[1]}/#{year}"
      end
      all_dates.push(date)
    end
  end
  return all_dates
end

def gather_date(date_cell)
  if date_cell != nil
    split = date_cell.split(' ')
    date = split[0]
    daymonthyear = date.split('/')
    if daymonthyear[0].length == 1
      day = '0' + daymonthyear[0]
      daymonthyear[0] = day
    end
    if daymonthyear[1].length == 1
      month = '0' + daymonthyear[1]
      daymonthyear[1] = month
    end
    if daymonthyear[2].length == 2
      year = '20' + daymonthyear[2]
      daymonthyear[2] = year
      date = "#{daymonthyear[0]}/#{daymonthyear[1]}/#{year}"
    end
  end
  return date
end

def smart_gather_dates(dates_column)
  all_dates = []
  dates_column.each do |given_date_cell|
    date = gather_date(given_date_cell)
    all_dates.push(date)
  end
  return all_dates
end

def find_user_by_player_name(player)
  users = User.all
  player_name = player[:name].downcase
  users.each do |given_user|
    user_first_name = given_user[:first_name].downcase
    if user_first_name == player_name
      player[:user_id] = given_user.id
      player[:email] = given_user.email
      player[:name] = "#{given_user.first_name} #{given_user.last_name}"
    end
  end
  return player
end

def pull_scores_from_row(table)
  all_matches = []
  row_counter = 0
  dates_column = table.by_col[0]
  headers = table.headers
  dates_column.each do |given_row|
    new_match = Match.create(date: gather_date(given_row), game_id: 1)
    column_counter = 2
    while column_counter <= 24
      operating_column = table.by_col[column_counter]
      if (operating_column[row_counter] != nil)
        new_player = {
          name: table.headers[column_counter],
          score: operating_column[row_counter],
          is_winner: false,
          user_id: 1,
          email: nil,
          match_id: new_match.id,
        }
        if operating_column[row_counter].to_i >= 10
          new_player = {
            name: table.headers[column_counter],
            score: operating_column[row_counter],
            is_winner: true,
            user_id: 1,
            email: nil,
            match_id: new_match.id,
          }
        end
        new_player = find_user_by_player_name(new_player)
        new_player_entry = Player.create(new_player)
      end
      column_counter += 1
    end
    row_counter += 1
  end
end

pull_scores_from_row(table)

print('Finished seeding!')

#### Depreciated seeds

# #PLAYERS

# #Match 1: Catan
# p1 =
#   Player.create(
#     score: 10,
#     is_winner: true,
#     match_id: m1.id,
#     user_id: tenzin.id,
#     name: "#{tenzin.first_name} #{tenzin.last_name}",
#   )
# p2 =
#   Player.create(
#     score: 9,
#     is_winner: false,
#     match_id: m1.id,
#     user_id: wes.id,
#     name: "#{wes.first_name} #{wes.last_name}",
#   )
# p3 =
#   Player.create(
#     score: 8,
#     is_winner: false,
#     match_id: m1.id,
#     user_id: yuyi.id,
#     name: "#{yuyi.first_name} #{yuyi.last_name}",
#   )
# p4 =
#   Player.create(
#     score: 7,
#     is_winner: false,
#     match_id: m1.id,
#     user_id: liam.id,
#     name: "#{liam.first_name} #{liam.last_name}",
#   )

# #Match 2: Catan

# p5 =
#   Player.create(
#     score: 10,
#     is_winner: true,
#     match_id: m2.id,
#     user_id: tenzin.id,
#     name: "#{tenzin.first_name} #{tenzin.last_name}",
#   )
# p6 =
#   Player.create(
#     score: 6,
#     is_winner: false,
#     match_id: m2.id,
#     user_id: wes.id,
#     name: "#{wes.first_name} #{wes.last_name}",
#   )
# p7 =
#   Player.create(
#     score: 8,
#     is_winner: false,
#     match_id: m2.id,
#     user_id: cj.id,
#     name: "#{cj.first_name} #{cj.last_name}",
#   )
# p8 =
#   Player.create(
#     score: 7,
#     is_winner: false,
#     match_id: m2.id,
#     user_id: ivan.id,
#     name: "#{ivan.first_name} #{ivan.last_name}",
#   )

# #Match 3: Catan

# p9 =
#   Player.create(
#     score: 8,
#     is_winner: false,
#     match_id: m3.id,
#     user_id: liam.id,
#     name: "#{liam.first_name} #{liam.last_name}",
#   )
# p10 =
#   Player.create(
#     score: 10,
#     is_winner: true,
#     match_id: m3.id,
#     user_id: wes.id,
#     name: "#{wes.first_name} #{wes.last_name}",
#   )
# p11 =
#   Player.create(
#     score: 5,
#     is_winner: false,
#     match_id: m3.id,
#     user_id: vanessa.id,
#     name: "#{vanessa.first_name} #{vanessa.last_name}",
#   )
# p12 =
#   Player.create(
#     score: 6,
#     is_winner: false,
#     match_id: m3.id,
#     user_id: john.id,
#     name: "#{john.first_name} #{john.last_name}",
#   )

# #Catan
# m1 = Match.create(date: '12/25/2021')
# g1.matches << m1

# m2 = Match.create(date: '12/31/2021')
# g1.matches << m2

# m3 = Match.create(date: '07/04/2021')
# g1.matches << m3
