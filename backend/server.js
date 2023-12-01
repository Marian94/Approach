const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3001;
const cors = require("cors");

let users = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3001, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/',  function(req, res){
    res.status(200).json(users);
});

app.post('/', function(req, res){
  const {body}= req;
  console.log(body)
  if(!body.email || !body.name || !body.phone){
    res.status(400).json({error: 'Missing parameters name, email or phone'});
  }
  const lastId = users[users.length - 1].id;
    const newUser = { ...body, id: lastId + 1 };
    users.push(newUser);
    res.status(200).send(users);
});

app.put('/:id', function(req, res){
  const {body}= req;
  const {id}= req.params;
  const userIndex = users.findIndex((user) => user.id == id);
  if(userIndex === -1){
    res.status(404).json({error: 'User not found'});
  }
  const updatedUser = {...users[userIndex], ...body};
  users[userIndex] = updatedUser;
  res.status(200).send(users);
});

app.delete('/:id', (req, res) => {
  const removeUser = users.filter(({ id }) => {
      return id != req.params.id;
  });
  if (removeUser.length < users.length) {
      users = removeUser;
      res.status(200).send(users);
  } else {
      res.status(404).end();
  }
});
