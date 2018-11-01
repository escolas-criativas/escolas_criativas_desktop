import Service from '@ember/service';
import { inject } from '@ember/service';

export default Service.extend({
  cached: inject(),

  records: null,
  recordsByIds: null,

  preloadAll() {
    const cached = this.get('cached');

    return new Promise( (resolve, reject)=> {
      cached.getItems('history', (err, items)=> {
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

  getAll(params) {
    return new Promise( (resolve)=> {
      if (!params) {
        return resolve(this.records);
      }

      return resolve(this.records.filter( (r)=> {
        if (params.haveText && !r.haveText) return false;
        if (params.haveImage && !r.haveImage) return false;
        if (params.haveVideo && !r.haveVideo) return false;
        if (params.haveAudio && !r.haveAudio) return false;

        if (params.disciplinas) {
          if (
            (!r.disciplinas || !r.disciplinas.length) ||
            (r.disciplinas.indexOf(params.disciplinas) == -1)
          ) {
            return false;
          }
        }

        if (params.temas) {
          if (
            (!r.temas || !r.temas.length) ||
            (r.temas.indexOf(params.temas) == -1)
          ) {
            return false;
          }
        }

        if (params.faixaEtaria) {
          if (
            (!r.faixaEtaria || !r.faixaEtaria.length) ||
            (r.faixaEtaria.indexOf(params.faixaEtaria) == -1)
          ) {
            return false;
          }
        }

        if (params.q) {
          if (
            (!r.title || r.title.indexOf(params.q) == -1) &&
            (!r.body || r.body.indexOf(params.q) == -1)
          ) {
            return false;
          }
        }

        return true;

      }));

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
