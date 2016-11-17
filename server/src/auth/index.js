// our packages
import './passport';
import login from './login';
import register from './register';

export { isUsernameTaken } from './register';

export default (app) => {
  login(app);
  register(app);
};
