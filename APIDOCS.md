
# API

> api routes

> [!NOTE]
> all the below routes should be prefixed with `/api`

> [!NOTE]
> every api responses will have the two fields shown below 
```javascript
    {
        success: boolean,
        message: string
    }
```


## Routes
- [/auth](#auth) 
    - [/login](#login)
    - [/register](#register)
    - [/verify](#verify)
    - [/resend](#resend)


- [/todo](#todo)
    - /
        - [`GET`](#get-todo-details)
        - [`POST`](#create-a-todo)
        - [`PUT`](#update-todo)
        - [`DELETE`](#delete-todo)
    - /all
        - [`GET`](#get-all-todos)


### auth

> auth related routes

#### login

- route: `/auth/login`
- method: `POST`
- description: login route for user
- request:
    - body: 
        ```javascript
            {
                email: string,
                password: string
            }
        ```
- response:
    - body: 
        ```javascript
            {
                token: string
            }
        ```

#### register

- route: `/auth/register`
- method: `POST`
- description: register route for user
- request:
    - body: 
        ```javascript
            {
                username: string,
                email: string,
                password: string,
                phone: string
            }
        ```
- response:
    - body: 
        ```javascript
            {}
        ```
#### verify

- route: `/auth/verify`
- method: `POST`
- description: verify user account
- request:
    - body: 
        ```javascript
            {
                token: string
            }
        ```
- response:
    - body: 
        ```javascript
            {}
        ```
#### resend

- route: `/auth/resend`
- method: `GET`
- description: resend verification email
- request:
    - header: 
        ```javascript
            {
                authorization: string,
            }
        ```
- response:
    - body: 
        ```javascript
            {}
        ```

### todo

#### get todo details

- route: `/todo`
- method: `GET`
- description: get todo details
- request:
    - query:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```
            {
                tood: TodoType
            }
        ```

#### create a todo

- route: `/todo`
- method: `POST`
- description: create a todo
- request:
    - body:
        ```javscript
            {
                name: string,
            }
        ```
- response:
    - body:
        ```javascript
            {
                todo: TodoType
            }
        ```

#### update todo

- route: `/todo`
- method: `PATCH`
- description: update tasks in a todo 
- request: 
    - body:
        ```javascript
            {
                _id: string,
                tasks: string,
            }
        ```
- response:
    - body:
        ```javascript
            {
                todo: TodoType
            }
        ```

#### delete todo

- route: `/todo`
- method: `DELETE`
- description: delete a todo
- request:
    - query:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {}
        ```

#### get all todos

- route: `/todo/all`
- method: `GET`
- description: get all todos for the user
- request:
    - headers:
        ```javascript
            {
                authorization: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                todos: TaskType[]
            }
        ```
