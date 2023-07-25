const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('src'));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const usersFile = '/Users/nicollemayol/PruebaTecnica_Mobiletec-1/data/users.json';

  let users = [];
  try {
    const data = await fs.readFile(usersFile);
    if (data.length > 0) {
      users = JSON.parse(data);
    }
  } catch (err) {
    console.error(`Failed to read file: ${usersFile}`);
  }

  // Check if the user already exists in the file
  const userExists = users.some(user => user.email === email);
  if (!userExists) {
    // Add the new user to the array
    users.push({ email, password });

    try {
      await fs.writeFile(usersFile, JSON.stringify(users));
    } catch (err) {
      console.error(`Failed to write file: ${usersFile}`);
      res.sendStatus(500);
    }
    res.sendStatus(200)
  }
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening at http://localhost:${port}`);
});
