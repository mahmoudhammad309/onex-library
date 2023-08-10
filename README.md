# Bookfolio :book:

## **About Bookfolio** :bulb:

- Bookfolio is a book management project built with Vue, Vuetify, Node.js, Express, and Sequelize with PostgreSQL. Bookfolio empowers users to efficiently manage their book collections. With an intuitive front-end interface and a robust back-end architecture, users can easily add, organize, and track their books. Bookfolio offers a seamless search system.

## **User Stories**

- As a user, I can create an account to access my profile.
- As a user, I have the ability to add a new book to my list.
- As a user, I can view the books that I have created.
- As a user, I have the option to delete a book from my list.
- As a user, I have the ability to edit the details of a book in my list.
- As a user, I can search for a book from my list using either the book's name or the author's name.

## **SQL Scheme**

![](https://res.cloudinary.com/dxkdwp3w3/image/upload/v1691666068/thgnivwy4pkc8jzirnje.png)

## **How to Launch App Locally** :-

- clone this repo by typing this command in the terminal:  
  `git clone https://github.com/mahmoudhammad309/onex-library`

- Run `npm install` to install the packages for the Back-end Server.
- Run `cd client` then `npm install` to install the packages for the Front-end app.

### Database Setup :clipboard:

make sure you have installed PostgreSQL and pgcli - if you're working on linux

```sql=
CREATE DATABASE {database name};
CREATE USER {user name} WITH superuser password {password}
ALTER DATABASE {database name} OWNER TO {user name};
```

- Run the following command in terminal to build your database directly after adding it in your environment variables

`npm run buildDB`

### **Environment variables:**

Environment variables are one of the ways we keep our product safe. If you want to access our app locally you will need to add your own.

"Just make sure you're in the root directory and have an account on cloudinary."

- create .env file
- add your Environment variables

```sh
DEV_DB_URL= # Your development PostgreSQL connect
DATABASE_URL= # Your production PostgreSQL connect
SECRET_KEY= # Your Secret key
cloud_name= # Your cloud name
api_key= # Your API key
api_secret= # Your API Secret key
```

- add your client side Environment variable
  Run `cd client`

```sh
VUE_APP_BASE_URL=http://localhost:5000/api/v1
```

### Start the App :electric_plug:

To start the App Locally you can start the server First then start client-side or vice versa!

> To run Server, In your terminal Type:
> "Just make sure you're in the root directory."
> `npm run dev`
> then you should be able to go to (http://localhost:5000/)

> To run client-side, In your terminal Type:
> "Just make sure you're in the root directory."
> `npm run serve`
> then you will be able to run (http://localhost:8080/)

Now you can view the app live in the Browser!

## **Technologies** :computer: :-

- BackEnd: **Node JS & Express JS**
- FrontEnd: **Vue JS**
- Middlewares: **Axios**
- Database: **PostgreSQL**
- ORM library: **Sequalize**
- Libraries: **Vuetify**
