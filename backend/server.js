const express = require('express');
const atob = require('atob'); // Ensure you have atob installed
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  const user_id = 'saichaitanya';
  const email = 'saichaitanya_kagita@srmap.edu.in';
  const roll_number = 'AP21110011367';

  const numbers = data.filter(item => !isNaN(item)).map(String);
  const alphabets = data.filter(item => isNaN(item));
  const highest_lowercase_alphabet = alphabets.filter(item => item === item.toLowerCase()).sort().slice(-1);

  let file_valid = false;
  let file_mime_type = '';
  let file_size_kb = 0;

  if (file_b64) {
    try {
      const fileBuffer = Buffer.from(file_b64.split(',')[1], 'base64');
      file_size_kb = fileBuffer.length / 1024;
      file_mime_type = file_b64.split(';')[0].split(':')[1];
      file_valid = true;
    } catch (error) {
      file_valid = false;
    }
  }

  res.status(200).json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet,
    file_valid,
    file_mime_type,
    file_size_kb: file_size_kb.toFixed(2)
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
