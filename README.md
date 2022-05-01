# interview_team_api
 This is for private team and group management.


# Team management
This is the detailed documentation of team API for this [website]('https://teams.bookgmt.com').





## Documentation

[Documentation](https://teams.bookgmt.com)

This project was developed using sql database `(postgresSQL)`. 

This will allow me to perform queries without having to restructure my database in future.

The project can use any DBMS without having to change the code but the database connection string.
## Tech Stack

**Client:** [Reactjs]("https://github.com/alwise/interview-team-client")

**Server:** 
    `NodeJS`,`Typescript`, `Express`, `Sequelize ORM`, `Posgress DB`, A`WS(ec2, S3, Route53)`, `JWT`, `yarn`

**REST API:** This is a REST API because it's simple and easy to implement with absolute controll.

## Database structure

![Database Structure](https://teamsprofile.s3.eu-west-1.amazonaws.com/screen-shots/db_structure.png)


## Features

- Create account (`email`,`name`,`password`)
- Login (`email`,`password`)
- Reset password (`email`,`password`)
- Email links for verification(`password reset` & `invite`)
- Create team(team name)
- Invite members(Team owner) using intee's `email`
- Accept invite(using link from invitee `email`)
- Manage team members(remove team member(only owner))
- Manage team(delete team)
- Edit profile(`email`,`name`,`profile photo`)
- Retrieve teams & team members


## Run Locally

Clone the project

```bash
  git clone https://github.com/alwise/interview-team-api.git
```

Go to the project directory

```bash
  cd interview-team-api
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file



`NODE_ENV=dev`

`PORT=2500`

`db_url=postgres://username:password@localhost:5432/team_db`

`token_secret=your_secrete`

`accessKeyId=AWS_ACCESS_KEY`

`secretAccessKey=AWS_SECRETE`

`privateKey=mail-jet-private-key`

`publicKey=mail-jet-public-key`

`senderMail=example@mail.com`

`sendName=Jam Team`
## API Reference

 **API** `https://api.teams.bookgmt.com/api/v1`

 **Authoriazation** `token`

#### Create account

```http
  POST /users/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name     ` | `string` | **Required**. name |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password (min=4) |

#### Login

```http
  POST /users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email of user |
| `password`      | `string` | **Required**. password of user|

#### Request password reset
This will send a confirmation email to the user to complete reset.
```http
  POST /users/request-reset
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email of user |
| `password`      | `string` | **Required**. new password to use|

#### Verify & Reset password 
 Verify the confirmation link clicked by user and update user password
```http
  PATCH /users/reset-password
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. link id |

#### Update profile

```http
  PATCH /users/update
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid`      | `string` | **Required**. user id |
| `email`      | `string` | **Optional**.  |
| `name`      | `string` | **Optional**.  |


## Team 

#### Create team

```http
  POST /teams/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of team |
| `uid`      | `string` | **Required**.  user Id of the creater


#### Update team

```http
  PATCH /teams/update
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.  team id
| `name`      | `string` | **Required**. new name |

#### Delete team

```http
  DELETE /teams/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.  team id

#### Get all teams for a user

```http
  GET /teams/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Required**.  uid of user

#### Get specific team

```http
  GET /teams/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.  team id



## Invitation

#### Invite new member

```http
  POST /invites/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.  invitee email
| `teamId`      | `string` | **Required**.  team id


#### Validate invite link

```http
  GET /invites/validate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.  invitation link id


#### Accept invite

```http
  GET /invites/accept
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.  invitation link id




## Team members

#### Delete member

```http
  DELETE /team-members/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Required**.  uid of member
| `teamId`      | `string` | **Required**.  team id


## Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `status`      | `boolean` | true, false
| `statusCode`      | `int` | 200, 400, 500
| `message`      | `string` | response message
| `data`      | `string` |    {},[]

```
{
    "status": true,
    "message": "Login successfully",
    "statusCode": 200,
    "data": {
        "uid": "9e2adfa9-6334-4920-9c21-fbdaf54dbde9",
        "email": "some@gmail.com",
        "name": "Sena",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI5ZTJhZ02MzM0LTQ5MjAtOWMyMS1mYmRhZjU0ZGJkZTkiLCJlbWFpbCI6ImtlbWV2b3JhbHdpc2VAZ21haWwuY29tIiwibmFtZSI6IlNlbmEiLCJpYXQiOjE2NTEzNjgyODcsImV4cCI6MTY4MjkyNTg4N30.GHGP5QBezcws6MgAAfEP-N8wO9Nai_0Qdg"
    }
}
```


## Roadmap

- Add chatting 

- Add video conferencing.

- File sharing


## Authors

- [@alwise](https://www.github.com/alwise)


## 🚀 About Me
I'm a full stack developer...


## Feedback

If you have any feedback, please reach out to me @kemevoralwise@gmail.com

