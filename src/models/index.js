// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Pin } = initSchema(schema);

export {
  User,
  Pin
};