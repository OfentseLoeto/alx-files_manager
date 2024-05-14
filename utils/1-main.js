import dbClient from './db';

const waitConnection = async () => {
  let i = 0;
  while (i < 10) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (dbClient.isAlive()) return;
    i++;
  }
  throw new Error('Connection timeout');
};

(async () => {
  console.log(dbClient.isAlive());
  await waitConnection();
  console.log(dbClient.isAlive());
  console.log(await dbClient.nbUsers());
  console.log(await dbClient.nbFiles());
})();
