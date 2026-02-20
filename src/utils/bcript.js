import bcrypt from 'bcrypt';

const saltRounds = +process.env.SALT;

export function hash(inputValue) {
  return bcrypt.hashSync(inputValue, saltRounds);
}

export function compare(clearPass, hash) {
  return bcrypt.compareSync(clearPass, hash);
}
