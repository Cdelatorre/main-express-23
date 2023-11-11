const express = require('express');
const app = express();
const hbs = require('hbs')

app.use(express.static('public'));

app.set("views", __dirname + "/views");
app.set("view_engine", 'hbs')

hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res, next) => {
  res.render('home.hbs', { name: 'Carlos', isAdult: true })
})

app.get('/users', (req, res, next) => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      response.json()
        .then((usersFromApi) => {
          res.render('users/users.hbs', { users: usersFromApi })
        })
        .catch((err) => {
          console.error(err)
        })
    })
    .catch(err => console.error(err))
})

app.get('/users/:id', (req, res, next) => {
  const id = req.params.id

  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => {
      response.json()
        .then((userFromApi) => {
          if (Object.keys(userFromApi).length === 0) {
            res.render('error.hbs')
            return
          }

          res.render('users/user-detail.hbs', { user: userFromApi })
        })
        .catch((err) => {
          console.error(err)
        })
    })
    .catch((err) => {
      console.error(err)
    })
})

app.get('/todos', (req, res, next) => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {
      response.json()
        .then((todosFromApi) => {
          res.render('todos/todos-list.hbs', { todos: todosFromApi })
        })
        .catch((err) => {
          console.error(err)
        })
    })
    .catch((err) => {
      console.error(err)
    })
})

app.get('/about', (req, res, next) => {
  res.status(200).render('about.hbs')
})

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
