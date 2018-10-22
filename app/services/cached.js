import Service from '@ember/service';

const fs = requireNode('fs');
const path = requireNode('path');
const homedir = requireNode('os').homedir();
const async = requireNode('async');

export default Service.extend({
  localCacheFolder: path.resolve(homedir, 'escolasCriativasCacheData'),

  getItems(modelName, cb) {
    const d = path.join(this.localCacheFolder, modelName);
    const p = path.join(d, 'list.json');

    fs.readFile(p, 'utf8', function(err, contents) {
      if (err) {
        // console.error('err>', err);
        return cb(null, []);
      }

      let items = JSON.parse(contents);

      async.mapSeries(items, (i, next)=> {
        const itp = path.join(d, 'items', String(i.id), 'data.json');
        fs.readFile(itp, 'utf8', (err, data)=> {
          if (err) return next(err);
          return next(null, JSON.parse(data) );
        });
      }, (err, results)=> {
        if (err) return cb(err);

        cb(null, results);
      });

    });
  }
});