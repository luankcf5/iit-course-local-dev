const fs = require('fs');
const dotenv = require('dotenv');
const { spawn } = require('child_process');

dotenv.config();

console.log('Đường dẫn tuyệt đối hiện tại:', process.cwd());

const content = `
PORT=${process.env.PORT}
DB=${process.env.DB}
EXEC=${process.env.EXEC}

# Make by system
DATABASE_URL="file:${process.cwd()}/${process.env.DB}"
`;

fs.writeFile('.env', content, (err) => {
  if (err) {
    console.log(err);
    console.log('Lỗi khi đọc file');
    return;
  }

  const bat = spawn(`${process.env.EXEC}`, { shell: true });

  bat.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  bat.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  bat.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
});
