import Service from '@ember/service';
import { inject } from '@ember/service';

export default Service.extend({
  cached: inject(),

  records: null,
  recordsByIds: null,

  preloadAll() {
    const cached = this.get('cached');

    return new Promise( (resolve, reject)=> {
      cached.getItems('news', (err, items)=> {
        if (err) return reject (err);
        this.set('records', items);

        this.recordsByIds = {};

        for (let i = 0; i < items.length; i++) {
          this.recordsByIds[items[i].id] = items[i];
        }

        resolve(items);
      });
    });
  },

  getAll() {
    return new Promise( (resolve)=> {
      resolve(this.records);
    });
  },
  getOneById(id) {
    return new Promise( (resolve)=> {
      resolve(this.recordsByIds[id]);
    });
  },

  getRelatedRecords(id) {
    return new Promise( (resolve)=> {
      let r = this.records.random();
      if (r.id == id) {
        return resolve([]);
      }

      resolve([r]);
    });
  }
});
