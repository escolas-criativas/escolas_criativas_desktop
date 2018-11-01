import Controller from '@ember/controller';
import { alias, oneWay } from '@ember/object/computed';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({
  queryParams: [
    'q',
    'searchTime',
    'disciplinas',
    'temas',
    'faixaEtaria',
    'haveText',
    'haveVideo',
    'haveAudio',
    'HaveImage',
    'page',
    'perPage'
  ],
  q: null,
  searchTime: null,
  disciplinas: null,
  temas: null,
  faixaEtaria: null,
  haveText: null,
  HaveImage: null,
  haveVideo: null,
  haveAudio: null,

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 15,

  // can be called anything, I've called it pagedContent
  // remember to iterate over pagedContent in your template
  pagedContent: pagedArray('model.records', {
    page: alias('parent.page'),
    perPage: alias('parent.perPage')
  }),

  // binding the property on the paged array
  // to a property on the controller
  totalPages: oneWay('pagedContent.totalPages'),

  init() {
    this._super(...arguments);
    this.setProperties({
      disciplinasOptions: {
        artes: 'artes',
        biologia: 'biologia',
        ciências: 'ciências',
        'ciências sociais': 'ciências sociais',
        'educação artistica': 'educação artistica',
        'educação física': 'educação física',
        filosofia: 'filosofia',
        fisica: 'fisica',
        geografia: 'geografia',
        história: 'história',
        inglês: 'inglês',
        'língua portuguesa': 'língua portuguesa',
        literatura: 'literatura',
        matemática: 'matemática',
        música: 'música',
        quimica: 'quimica',
        sociologia: 'sociologia',
        teatro: 'teatro'
      },
      temasOptions: {
        antropologia: 'antropologia',
        'cidadania': 'cidadania',
        'ciências naturais': 'ciências naturais',
        'comunicação': 'comunicação',
        'cultura de massa': 'cultura de massa',
        'discriminação e preconceito racial': 'discriminação e preconceito racial',
        'diversidade': 'diversidade',
        'economia': 'economia',
        'educação ambiental': 'educação ambiental',
        'ética': 'ética',
        'família': 'família',
        'geologia': 'geologia',
        'gerontologia': 'gerontologia',
        'inclusão/deficiências': 'inclusão/deficiências',
        'meio ambiente': 'meio ambiente',
        'MPB': 'MPB',
        'orientação sexual': 'orientação sexual',
        'pedagogia': 'pedagogia',
        'pluralidade cultural': 'pluralidade cultural',
        'política': 'política',
        'psicologia': 'psicologia',
        'redação': 'redação',
        'relações de gênero': 'relações de gênero',
        'saúde': 'saúde',
        'sexualidade': 'sexualidade',
        'tecnologias': 'tecnologias',
        'tecnologias da informação': 'tecnologias da informação',
        'temas locais': 'temas locais',
        'trabalho e consumo': 'trabalho e consumo'
      },
      faixaEtariaOptions: {
        'a partir de 14 anos': 'a partir de 14 anos',
        'acima de 18 anos': 'acima de 18 anos',
        'de 10 a 14 anos': 'de 10 a 14 anos',
        'de 14 a 18 anos': 'de 14 a 18 anos',
        'de 3 a 7 anos': 'de 3 a 7 anos',
        'de 7 a 10 anos': 'de 7 a 10 anos',
        'todas as idades': 'todas as idades'
      }
    })
  },

  actions: {
    doSearch() {
      this.set('searchTime', new Date());
    },

    setSelectVal(attr, v) {
      if (v.target.value == 'null') {
        v.target.value = null;
      }

      this.set(attr, v.target.value);
    }
  }
});
