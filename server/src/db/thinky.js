// npm packages
import initThinky from 'thinky';

// our packages
import { db as dbConfig } from '../../config';

export default initThinky(dbConfig);
