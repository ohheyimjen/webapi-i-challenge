// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

server.listen(4000, () => {
  console.log("Server running on localhost:4000");
});

server.get("/", (req, res) => {
  res.send("Web Api Challenge");
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  db.insert(userInfo)
    .then(user => {
      if (!user.name || !user.bio) {
        res.status(400).json({
          success: false,
          errorMessage: "No name, no bio, no service."
        });
      } else {
        res.status(201).json({
          success: true,
          user
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "There was an error while saving the user to the database"
      });
    });
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving users" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ success: true, message: err.message });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({
          success: false,
          message: "I cannot find the user you are looking for 💩"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message
      });
    });
});
