export default function handler(req, res) {
  res.status(200).json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'John Author' },
    { id: 3, name: 'John Admin' },
    { id: 4, name: 'John Tester' },
    { id: 5, name: 'John Master' },
  ]);
}
