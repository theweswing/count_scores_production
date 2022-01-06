# Authenticating Users Lab

## Learning Goals

- Use the session hash to log in a user

## Introduction

In this lab, we'll continue working on the blog site and set up a basic login
feature.

There is some starter code in place for a Rails API backend and a React frontend.
To get set up, run:

```console
$ bundle install
$ rails db:migrate db:seed
$ npm install --prefix client
```

You can work on this lab by running the tests with `learn test`. It will also be
helpful to see what's happening during the request/response cycle by running the
app in the browser. You can run the Rails server with:

```console
$ rails s
```

And you can run React in another terminal with:

```console
$ npm start --prefix client
```

You don't have to make any changes to the React code to get this lab working.

## Instructions

For our basic login feature, we'll need the following functionality:

- A user can log in by providing their username in a form
- A user can log out
- A user can remain logged in, even after refreshing the page

We'll need to create the routes and controller methods to handle each of these features. Let's get started!

### Sessions

- Generate these routes:

  - `POST /login`: run the `SessionsController#create` method
  - `DELETE /logout`: run the `SessionsController#destroy` method

- Create a sessions controller.

  - **Note:** If you use the generators to generate your controllers, be sure to
    pass the `--no-test-framework` flag to avoid generating unneeded files:
    `rails g controller Sessions --no-test-framework`

- Make a `SessionsController#create` method. It should:

  - Find a user in the database using the username from `params`
  - Save the user's ID to the session hash
  - Return the user as a JSON object

- Make a `SessionsController#destroy` method. It should:

  - Remove the user ID from the session hash
  - Return an empty response with a 204 No Content status code

### Users

- Generate these routes:

  - `GET /me`: run the `UsersController#show` method

- Create a users controller.

  - **Note:** If you use the generators to generate your controllers, be sure to
    pass the `--no-test-framework` flag to avoid generating unneeded files:
    `rails g controller Users --no-test-framework`

- Make a `UsersController#show` method. It should:
  - Find a user in the database using the user id from the session hash
  - Return the user as a JSON object
