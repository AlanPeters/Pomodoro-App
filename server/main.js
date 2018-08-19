import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';
import { Tasks } from '../imports/api/Tasks.js';
import '../imports/api/Timer.js';
import '../imports/api/Configuration.js';

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});


Migrations.add({
  version: 1,
  up() {
    Tasks.update(
      { doneTime: null, isDone: true },
      {
        $set: { doneTime: new Date() },
      },
      { multi: true },
    );
    Tasks.update(
      {},
      {
        $unset: { isDone: '' },
      },
      { multi: true },
    );
  },
  down() {
    // Leave doneTime set for future migrations
    Tasks.update(
      { doneTime: { $ne: null } },
      {
        $set: { isDone: true },
      },
      { multi: true },
    );
  },
});
