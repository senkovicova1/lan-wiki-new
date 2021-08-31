import {
  Mongo
} from 'meteor/mongo';

export const NotebooksCollection = new Mongo.Collection( 'notebooks' );