const pause = (millis) =>
  new Promise((resolve) => {
    setTimeout(resolve, millis);
  });

export default async function handler(req, res) {
  const {
    body: { username, password },
    method,
  } = req;

  await pause(2000);

  switch (method) {
    case 'POST':
      if (username === 'anguer' && password === '123456') {
        res.status(200).json({ id: 1, username: 'admin', token: 'asdsadwqezcxzewrdsad' });
        return;
      }
      res.status(500).json({ message: 'username and password is incorrect' });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
