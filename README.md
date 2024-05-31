# Todo

[visit the site](https://todo.shadinmhd.in)

todo is a application made for increasing your productivity by letting you keep track of what needs to be done


## stack

- nextjs
- mongoose
- bcrypt
- jsonwebtoken
- tailwindcss


## Run locally

#### pre-requisites

- node : v20.^
- npm : 10.^
- mongodb: 7.^

#### clone the repo

close this repository to your preferred direcory

```bash
    git clone https://github.com/shadinmhd/reps
```

#### install libraries

install the required javascript libraries using your preferred package manger 

for npm:
```bash
    npm install 
```

#### create environment variables

create .env.local file from the .env.example for easy fill for the requred variables

```bash
    cat .env.example > .env.local
```

#### start server

start the server:
```bash
    npm run dev
```

>[!WARNING]
> by default nextjs uses 3000 port for the server make sure you are not using it or run the below command with your preffered port number

```bash
    npm run dev - --p <port number here>
```

now open your browser and visit http://localhost:3000 and wait for some seconds

