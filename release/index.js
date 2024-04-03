const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const toUnixPath = (path) =>
  path.replace(/[\\/]+/g, '/').replace(/^([a-zA-Z]+:|\.\/)/, '');

let DATABASE_URL;
if (process.platform == 'win32') {
  DATABASE_URL = `file:${toUnixPath(process.cwd())}/${process.env.DB}`;
} else {
  DATABASE_URL = `file:${process.cwd()}/${process.env.DB}`;
}
console.log(DATABASE_URL);

const content = `
DEBUG=${process.env.DEBUG}
PORT=${process.env.PORT}
DB=${process.env.DB}
EXEC=${process.env.EXEC}

# Make by system
DATABASE_URL="${DATABASE_URL}"
`;

fs.promises.writeFile('.env', content);
