import { config } from './config/config';
//import { tokenAuthenticate } from "./auth/tokenAuthenticate";
import { AppServer } from './AppServer';

const port = config.server.port;
const server = new AppServer();
server.start(port);
//app.use('/api/v1/clients', tokenAuthenticate, clientRouter);


