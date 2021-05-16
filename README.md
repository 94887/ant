# ant
# technologies
  1. pg
  2. mongoDB
  3. knex
  4. express
  5. node.js
  6. knex.js
# API's
  1. user reguester
     POST localhost:8080/api/register
        {{data flow}}
        1. if user is new user user will get the allocation
        2. if email/uniqueUserId is already register it won't allow user to register
        3. user register data will save in mongoDB and userID & org_name will store in postgres
        4. if user is new user will get the unique org_id
        5. mongoDB
        6. request
        7. {
        8.  "firstName": "Rachit",
        9.  "lastName": "Sharma",
        10.    "uniqueUserId": "rs94887",
        11.    "orgName": "Rachit"
        12.    "email": "rs94887@gmail.com",
        13.    "password": "*********"
        14.  }
        15.  response
        16.  {
        17.    "firstName": "Rachit",
        18.    "lastName": "Sharma",
        19.    "uniqueUserId": "rs94887",
        20.    "orgName": "Rachit"
        21.    "email": "rs94887@gmail.com",
        22.    "password": "nsdbhbsd7sd5b3nbehkbw" //hashed password
        23.    "token": ""
        24.  }
        25. postgres
        26. id----org_name----name----userId----created_at
        27. 1-----Rachit------Rachit--1234------2021-05-16T13:10:10+00:00
  2. user login
     POST localhost:8080/api/users/login
        {{data flow}}
        1. user provides the email & password and get login
        2. request 
        3. {
        4.   "email": "rs94887@gmail.com",
        5.    "password": "*********"
        6. }
  3. list users and pagination
     GET localhost:8080/api/users/list/:obj/:pageNumber/:nPerPage
        1. obj:"firstName, lastName, userId"
        2. pageNumber: page numer we want to go
        3. nPerPage: number of documents per page
        4. request
        5. localhost:8080/api/users/sort/firstName/1/5
        
  4. sorting and pagination
     GET GET localhost:8080/api/users/sort/:obj/:pageNumber/:nPerPage
        1. obj:"firstName, lastName, userId, emailId, organizationName"
        2. pageNumber: page numer we want to go
        3. nPerPage: number of documents per page
        4. request
        5. localhost:8080/api/users/sort/firstName/1/5
