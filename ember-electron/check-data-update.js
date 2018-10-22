const request = require('request'),
  async = require('async'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  extract = require('extract-zip'),
  fs = require('fs');

const homedir = require('os').homedir();

function checkDataUpdate() {
  updater.init();
}

const updater = {
  updateUrl: 'http://localhost:8200/public/project/cacheData/',
  localInfoFile: null,
  localCacheFolder: path.resolve(homedir, 'escolasCriativasCacheData'),

  init (cb) {
    if (!cb) cb = function(){}

    this.env = process.env.NODE_ENV || 'production';

    if (this.env == 'production') {
      this.updateUrl = 'http://escolascriativas.linkysystems.com/public/project/cacheData/';
    }

    this.createCacheFoldersIfNotExists( (err)=> {
      if (err) return cb(err);

      updater.update(cb);
    });
  },

  loadLocalInfoFile(cb) {
    let f = path.join(this.localCacheFolder, 'info.json');

    fs.readFile(f, 'utf8', (err, c)=> {
      if (err) {
        if (err.code == 'ENOENT') {
          return cb(null, { updatedAt: 0, version: 0 });
        }

        return cb(err);
      }

      cb(null, JSON.parse(c));
    });
  },

  requestInfoFile(cb) {
    request(this.updateUrl+'info.json', (err, res, body)=> {
      if (err) {
        console.log(err);
        return cb(err);
      }

      try {
        let data = JSON.parse(body);

        if (!data || !data.updatedAt) {
          return cb();
        }

        cb(null, data);
      } catch(e) {
        cb();
      }

    });
  },

  update(cb) {
    this.checkIfHaveUpdate( (err, have, info, oldInfo)=> {
      if (err) return cb(err);
      if (!have) return cb();

      let lists;

      async.series([
        function (done) {
          updater.downloadEachListFile(info, (err, l)=> {
            lists = l;
            return done(err);
          });
        },
        function (done) {
          async.each(info.models, (model, next)=> {
            updater.updateEachContent(lists[model], model, oldInfo, next);
          }, done);
        },

        function (done) {
          updater.saveLists(lists, done);
        },

        function (done) {
          updater.saveInfo(info, done);
        }
      ], cb);
    });
  },

  checkIfHaveUpdate(cb) {
    let info, localInfo;
    let haveUpdate = false;

    async.series([
      function(done) {
        updater.requestInfoFile( (err, i)=> {
          info = i;
          done(err);
        });
      },
      function(done) {
        if (!info) return done();

        updater.loadLocalInfoFile( (err, i)=> {
          localInfo = i;
          done();
        });
      },
      function(done) {
        if (!info) return done();

        if (
          !localInfo ||
          (localInfo.updatedAt < info.updatedAt)
        ) {
          haveUpdate = true;
        }

        done();
      }
    ], (err)=> {
      if (err) return cb(err);
      cb(null, haveUpdate, info, localInfo);
    });
  },

  updateEachContent(list, model, oldInfo, cb) {
    async.eachSeries(list, (item, next)=> {
      if (item.updatedAt <= oldInfo.updatedAt) {
        // not updated, skip
        return next();
      }

      let folder = path.resolve(updater.localCacheFolder, model, 'items', String(item.id));
      let p = folder+'.zip';

      mkdirp(folder, (err)=> {
        if (err) return next(err);
        let url = this.updateUrl+model+'/items/'+item.id+'.zip';

        request(url, (err)=> {
          if (err) return next(err);

          extract(p, {
            dir: folder
          }, next);
        })
        .pipe(fs.createWriteStream(p));

      });

    }, cb);
  },

  downloadEachListFile(info, cb) {
    const models = info.models;
    if (!models || !models.length) return cb();

    let lists = {};

    async.each(models, (model, next)=> {
      request(this.updateUrl+model+'/'+'list.json', (err, res, body)=> {
        if (err) return next(err);

        try {
          lists[model] = JSON.parse(body);
          next();
        } catch(e) {
          next(e);
        }
      });

    }, (err)=> {
      if (err) return cb(err);

      cb(null, lists);
    });

  },

  saveLists(lists, cb) {
    let models = Object.keys(lists);

    async.each(models, (model, next)=> {
      let p = path.join(updater.localCacheFolder, model, 'list.json');
      fs.writeFile(p, JSON.stringify( lists[model] ), next);
    }, cb);
  },

  saveInfo(info, cb) {
    let p = path.join(updater.localCacheFolder, 'info.json');
    fs.writeFile(p, JSON.stringify( info ), cb);
  },

  createCacheFoldersIfNotExists(cb) {
    mkdirp(this.localCacheFolder, cb);
  }
};

checkDataUpdate.updater = updater;

module.exports = checkDataUpdate;