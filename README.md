* After npm install, run the server and 
* Please use postman for accessing the api,
* In autorization use Bearer Token, for accessing protected routes
* In the request url, put: localhost:4000/graphql, (Since it is a graphql api, only one route is defined)
* USE POST method for all queries(getting data, adding data,  updating data, etc.).


Please go to http://localhost:4000/graphql in the postman

These are the APIs

# CREATING USER

* api url: http://localhost:4000/graphql?query=mutation%7B%0A%20%20addUser(%0A%20%20%20%20name%3A%20%22Burke%20Thokchom%22%2C%0A%20%20%20%20email%3A%22burke%40gmail.com%22%2C%0A%20%20%20%20password%3A%20%22burke%40gmail.com%22%0A%20%20)%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20email%0A%20%20%20%20events%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20eventLink%0A%20%20%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20%20%20_id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20email%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20time%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D

* query: mutation{
  addUser(
    name: "Burke Thokchom",
    email:"burke@gmail.com",
    password: "burke@gmail.com"
  ){
    _id
    name
    email
    events{
      _id
      name
      eventLink
      createdBy{
        _id
        name
        email
      }
      time
    }
  }
}

* api success response: {
  "data": {
    "addUser": {
      "_id": "5f60e20d9193d41300dae722",
      "name": "Burke Thokchom",
      "email": "burke@gmail.com",
      "events": null
    }
  }
}



# UPDATING USER (Protected Route)

* api url: "http://localhost:4000/graphql?query=mutation%7B%0A%20%20updateUser(%0A%20%20%20%20_id%3A%20%225f60e20d9193d41300dae722%22%2C%0A%20%20%20%20name%3A%20%22Thokchom%20Burke%22%0A%20%20)%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20email%0A%20%20%20%20events%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20eventLink%0A%20%20%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20%20%20_id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20email%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20time%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"

* query: mutation{
  updateUser(
    _id: "5f60e20d9193d41300dae722",
    name: "Thokchom Burke"
  ){
    _id
    name
    email
    events{
      _id
      name
      eventLink
      createdBy{
        _id
        name
        email
      }
      time
    }
  }
}

* api error response: {
  "errors": [
    {
      "message": "You do not access to ths resource. Please login with right credentials",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "updateUser"
      ]
    }
  ],
  "data": {
    "updateUser": null
  }
}

* api success response: {
    "data": {
        "updateUser": {
            "_id": "5f60e20d9193d41300dae722",
            "name": "Thokchom Burke",
            "email": "burke@gmail.com",
            "events": null
        }
    }
}




# DELETE USER (Protected Route)

* api url: "http://localhost:4000/graphql?query=mutation%7B%0A%20%20deleteUser(_id%3A%20%225f60e20d9193d41300dae722%22)%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20email%0A%20%20%20%20events%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20eventLink%0A%20%20%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20%20%20_id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20email%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20time%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"

* query: mutation{
  deleteUser(_id: "5f60e20d9193d41300dae722"){
    _id
    name
    email
    events{
      _id
      name
      eventLink
      createdBy{
        _id
        name
        email
      }
      time
    }
  }
}

* api error response: {
  "errors": [
    {
      "message": "You do not access to ths resource. Please login with right credentials",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "deleteUser"
      ]
    }
  ],
  "data": {
    "deleteUser": null
  }
}

* api success response: {
    "data": {
        "deleteUser": {
            "_id": "5f60e20d9193d41300dae722",
            "name": "Thokchom Burke",
            "email": "burke@gmail.com",
            "events": null
        }
    }
}


# LOGIN

* api url: "http://localhost:4000/graphql?query=%7B%0A%20%20login(email%3A%20%22burke%40gmail.com%22%2C%20password%3A%20%22burke%40gmail.com%22)%7B%0A%20%20%20%20userId%2C%0A%20%20%20%20token%0A%20%20%20%20tokenExpiryTime%0A%20%20%20%20email%0A%20%20%20%20user%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20email%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"

* query: {
  login(email: "burke@gmail.com", password: "burke@gmail.com"){
    userId,
    token
    tokenExpiryTime
    email
    user{
      _id
      email
      name
    }
  }
}

* api success response: {
  "data": {
    "login": {
      "userId": "5f60e20d9193d41300dae722",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjYwZTIwZDkxOTNkNDEzMDBkYWU3MjIiLCJlbWFpbCI6ImJ1cmtlQGdtYWlsLmNvbSIsImlhdCI6MTYwMDE4NTY4MywiZXhwIjoxNjAwMTg5MjgzfQ.uCwqsdKK64iEtXhxoJXbsBohl87I80UIIceeUrUaz6g",
      "tokenExpiryTime": "1h",
      "email": "burke@gmail.com",
      "user": {
        "_id": "5f60e20d9193d41300dae722",
        "email": "burke@gmail.com",
        "name": "Burke Thokchom"
      }
    }
  }
}

* api error response: {
  "errors": [
    {
      "message": "Username and password does not match",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "login"
      ]
    }
  ],
  "data": {
    "login": null
  }
}


# GET USER BY ID

api url: "http://localhost:4000/graphql?query=%7B%0A%20%20getUserById(_id%3A%20%225f60e20d9193d41300dae722%22)%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20email%0A%20%20%20%20events%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20eventLink%0A%20%20%20%20%20%20time%0A%20%20%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20%20%20_id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20email%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"

* query: {
  getUserById(_id: "5f60e20d9193d41300dae722"){
    _id
    name
    email
    events{
      _id
      name
      eventLink
      time
      createdBy{
        _id
        name
        email
      }
    }
  }
}

api success response: {
  "data": {
    "getUserById": {
      "_id": "5f60e20d9193d41300dae722",
      "name": "Thokchom Burke",
      "email": "burke@gmail.com",
      "events": null
    }
  }
}


# GET USER BY EMAIL

* api url: "http://localhost:4000/graphql?query=%7B%0A%20%20getUserByEmail(email%3A%20%22burke%40gmail.com%22)%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20email%0A%20%20%20%20events%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20eventLink%0A%20%20%20%20%20%20time%0A%20%20%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20%20%20_id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20email%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"

* query: {
  getUserByEmail(email: "burke@gmail.com"){
    _id
    name
    email
    events{
      _id
      name
      eventLink
      time
      createdBy{
        _id
        name
        email
      }
    }
  }
}

* api success response: {
  "data": {
    "getUserByEmail": {
      "_id": "5f60e20d9193d41300dae722",
      "name": "Thokchom Burke",
      "email": "burke@gmail.com",
      "events": null
    }
  }
}


# GET ALL USERS

api url: "http://localhost:4000/graphql?query=%7B%0A%20%20getAllUsers%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20email%0A%20%20%20%20events%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20eventLink%0A%20%20%20%20%20%20time%0A%20%20%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20%20%20_id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20email%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"

* query: {
  getAllUsers{
    _id
    name
    email
    events{
      _id
      name
      eventLink
      time
      createdBy{
        _id
        name
        email
      }
    }
  }
}


* api success response: {
  "data": {
    "getAllUsers": [
      {
        "_id": "5f60e20d9193d41300dae722",
        "name": "Thokchom Burke",
        "email": "burke@gmail.com",
        "events": null
      }
    ]
  }
}


# CREATING EVENTS (Protected Route)

* api url: "http://localhost:4000/graphql?query=mutation%7B%0A%20%20addEvent(%0A%20%20%20%20name%3A%20%22Office%20Meeting%22%2C%0A%20%20%20%20eventLink%3A%20%22https%3Awww.google.meet.com%2Ffada%22%2C%0A%20%20%20%20time%3A%20%222020-09-15T16%3A24%3A35.166Z%22%2C%0A%20%20)%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20email%0A%20%20%20%20%7D%0A%20%20%20%20eventLink%0A%20%20%20%20time%0A%20%20%7D%0A%7D"

* query: mutation{
  addEvent(
    name: "Office Meeting",
    eventLink: "https:www.google.meet.com/fada",
    time: "2020-09-15T16:24:35.166Z",
  ){
    _id
    name
    createdBy{
      _id
      name
      email
    }
    eventLink
    time
  }
}

* api error response: {
  "errors": [
    {
      "message": "Please login and try again",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "addEvent"
      ]
    }
  ],
  "data": {
    "addEvent": null
  }
}

* api success response: {
    "data": {
        "addEvent": {
            "_id": "5f60eb68e6267135e4a0151d",
            "name": "Office Meeting",
            "createdBy": {
                "_id": "5f60e20d9193d41300dae722",
                "name": "Thokchom Burke",
                "email": "burke@gmail.com"
            },
            "eventLink": "https:www.google.meet.com/fada",
            "time": "1600187075166"
        }
    }
}

# UPDATE EVENT (Protected Route)

// please provide time in ISO- STRING
* api url: "http://localhost:4000/graphql?query=mutation%7B%0A%20%20updateEvent(%0A%20%20%20%20_id%3A%20%225f60eb68e6267135e4a0151d%22%2C%20%0A%20%20%20%20name%3A%20%22Office%20Daily%20Closing%20Meeting%22%2C%0A%20%20%20%20eventLink%3A%20%22https%3Awww.google.meet.com%2Ffada%22%2C%0A%20%20%20%20time%3A%20%222020-09-15T16%3A24%3A35.166Z%22%2C%0A%20%20)%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20email%0A%20%20%20%20%7D%0A%20%20%20%20eventLink%0A%20%20%20%20time%0A%20%20%7D%0A%7D"

* query: mutation{
  updateEvent(
    _id: "5f60eb68e6267135e4a0151d", 
    name: "Office Daily Closing Meeting",
    eventLink: "https:www.google.meet.com/fada",
    time: "2020-09-15T16:24:35.166Z",
  ){
    _id
    name
    createdBy{
      _id
      name
      email
    }
    eventLink
    time
  }
}

* api error-response: {
  "errors": [
    {
      "message": "You do not access to ths resource. Please login with right credentials",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "updateEvent"
      ]
    }
  ],
  "data": {
    "updateEvent": null
  }
}

* api success response: {
    "data": {
        "updateEvent": {
            "_id": "5f60eb68e6267135e4a0151d",
            "name": "Office Daily Closing Meeting",
            "createdBy": {
                "_id": "5f60e20d9193d41300dae722",
                "name": "Thokchom Burke",
                "email": "burke@gmail.com"
            },
            "eventLink": "https:www.google.meet.com/fada",
            "time": "1600187075166"
        }
    }
}


# DELETE EVENT (Protected Route)

* api url: "http://localhost:4000/graphql?query=mutation%7B%0A%20%20deleteEvent(%0A%20%20%20%20_id%3A%20%225f60eb68e6267135e4a0151d%22)%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20email%0A%20%20%20%20%7D%0A%20%20%20%20eventLink%0A%20%20%20%20time%0A%20%20%7D%0A%7D"

* query: mutation{
  deleteEvent(
    _id: "5f60eb68e6267135e4a0151d"){
    _id
    name
    createdBy{
      _id
      name
      email
    }
    eventLink
    time
  }
}

* api error response: {
  "errors": [
    {
      "message": "You do not access to ths resource. Please login with right credentials",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "deleteEvent"
      ]
    }
  ],
  "data": {
    "deleteEvent": null
  }
}

* api success response: {
    "data": {
        "deleteEvent": {
            "_id": "5f60eb68e6267135e4a0151d",
            "name": "Office Daily Closing Meeting",
            "createdBy": {
                "_id": "5f60e20d9193d41300dae722",
                "name": "Thokchom Burke",
                "email": "burke@gmail.com"
            },
            "eventLink": "https:www.google.meet.com/fada",
            "time": "1600187075166"
        }
    }
}

# GET ALL EVENTS (Protected Route)

* api url: "http://localhost:4000/graphql?query=%7B%0A%20%20getAllEvents%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20email%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20eventLink%0A%20%20%20%20time%0A%20%20%7D%0A%7D"

* query: {
  getAllEvents{
    _id
    name
    createdBy{
      _id
      email
      name
    }
    eventLink
    time
  }
}

* api error response: {
  "errors": [
    {
      "message": "Please login and try again",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "getAllEvents"
      ]
    }
  ],
  "data": {
    "getAllEvents": null
  }
}

* api success response: {
    "data": {
        "getAllEvents": [
            {
                "_id": "5f60eb68e6267135e4a0151d",
                "name": "Office Daily Closing Meeting",
                "createdBy": {
                    "_id": "5f60e20d9193d41300dae722",
                    "email": "burke@gmail.com",
                    "name": "Thokchom Burke"
                },
                "eventLink": "https:www.google.meet.com/fada",
                "time": "1600187075166"
            }
        ]
    }
}

# GET EVENT BY ID (Protected Route)

* api url: "http://localhost:4000/graphql?query=%7B%0A%20%20getEventById(_id%3A%225f60eb68e6267135e4a0151d%22)%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20email%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20eventLink%0A%20%20%20%20time%0A%20%20%7D%0A%7D%0A"

* query: {
  getEventById(_id:"5f60eb68e6267135e4a0151d"){
    _id
    name
    createdBy{
      _id
      email
      name
    }
    eventLink
    time
  }
}


* api error response: {
  "errors": [
    {
      "message": "Please login and try again",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "getEventById"
      ]
    }
  ],
  "data": {
    "getEventById": null
  }
}

* api success response: {
    "data": {
        "getEventById": {
            "_id": "5f60eb68e6267135e4a0151d",
            "name": "Office Daily Closing Meeting",
            "createdBy": {
                "_id": "5f60e20d9193d41300dae722",
                "email": "burke@gmail.com",
                "name": "Thokchom Burke"
            },
            "eventLink": "https:www.google.meet.com/fada",
            "time": "1600187075166"
        }
    }
}

# GET ALL USER EVENTS (Protected Route)

* api url: "http://localhost:4000/graphql?query=%7B%0A%20%20getAllUserEvents%7B%0A%20%20%20%20_id%0A%20%20%20%20name%0A%20%20%20%20createdBy%7B%0A%20%20%20%20%20%20_id%0A%20%20%20%20%20%20email%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20eventLink%0A%20%20%20%20time%0A%20%20%7D%0A%7D%0A"

* query: {
  getAllUserEvents{
    _id
    name
    createdBy{
      _id
      email
      name
    }
    eventLink
    time
  }
}

* api error response: {
  "errors": [
    {
      "message": "You do have permission for this resource. Please login and try again",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "getAllUserEvents"
      ]
    }
  ],
  "data": {
    "getAllUserEvents": null
  }
}

* api success response: {
    "data": {
        "getAllUserEvents": [
            {
                "_id": "5f60eb68e6267135e4a0151d",
                "name": "Office Daily Closing Meeting",
                "createdBy": {
                    "_id": "5f60e20d9193d41300dae722",
                    "email": "burke@gmail.com",
                    "name": "Thokchom Burke"
                },
                "eventLink": "https:www.google.meet.com/fada",
                "time": "1600187075166"
            }
        ]
    }
}
