# ant
# technologies
  1. pg
  2. mongoDB
  3. knex
  4. express
  5. node.js
# API's
  1. user reguester
     POST localhost:8080/api/register
        data flow
        1. if user is new user user will get the allocation
        2. if email/uniqueUserId is already register it won't allow user to register
        3. user register data will save in mongoDB and userID & org_name will store in postgres
        4. if user is new user will get the unique org_id
        5. mongoDB
         6. request
          {
            "firstName": "Rachit",
            "lastName": "Sharma",
            "uniqueUserId": "rs94887",
            "orgName": "Rachit"
            "email": "rs94887@gmail.com",
            "password": "*********"
          }
          response
          {
            "firstName": "Rachit",
            "lastName": "Sharma",
            "uniqueUserId": "rs94887",
            "orgName": "Rachit"
            "email": "rs94887@gmail.com",
            "password": "nsdbhbsd7sd5b3nbehkbw" //hashed password
            "token": ""
          }
        6. postgres
        id     org_name    name     userId      created_at
        1      Rachit      Rachit   1234        2021-05-16T13:10:10+00:00
  2. user login
     POST localhost:8080/api/users/login
        data flow
        1. user provides the email & password and get login
        request 
        {
          "email": "rs94887@gmail.com",
          "password": "*********"
        }
  3. list users and pagination
     GET localhost:8080/api/users/list/:obj/:pageNumber/:nPerPage
        obj:"firstName, lastName, userId"
        pageNumber: page numer we want to go
        nPerPage: number of documents per page
      request
      localhost:8080/api/users/sort/firstName/1/5
        
  4. sorting and pagination
     GET GET localhost:8080/api/users/sort/:obj/:pageNumber/:nPerPage
        obj:"firstName, lastName, userId, emailId, organizationName"
        pageNumber: page numer we want to go
        nPerPage: number of documents per page
      request
      localhost:8080/api/users/sort/firstName/1/5
