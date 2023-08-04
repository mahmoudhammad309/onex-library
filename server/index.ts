import  server  from './app';
import environment from './config/environment';

const port = environment.port;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server is running in http://localhost:${port} :)`,
  );
});
