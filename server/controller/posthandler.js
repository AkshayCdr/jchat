const users = [
  {
    username: "a",
    password: "a",
  },
  {
    username: "b",
    password: "b",
  },
  {
    username: "c",
    password: "c",
  },
];

export function posthandler(req, res) {
  //   console.log(req.session);
  if (!req.body.userName && !req.body.password) {
    res.status(404).json({ message: "invalid username or password" });
    return;
  }

  const user = users.find((user) => user.username === req.body.userName);

  if (user.password !== req.body.password) {
    res.status(404).json({ message: "invalid password" });
    return;
  }
  res.send(200);
}
