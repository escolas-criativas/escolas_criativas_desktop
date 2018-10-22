module.exports = {
  'make_targets': {
    'win32': [
      'squirrel'
    ],
    'darwin': [
      'zip'
    ],
    'linux': [
      'deb',
      'rpm'
    ]
  },
  'electronPackagerConfig': {
    'packageManager': 'npm',
    'icon': 'public/logo.png',
    'productName': 'Escolas Criativas Desktop'
  },
  'electronWinstallerConfig': {
    'name': 'desk',
    'productName': 'Escolas Criativas Desktop'
  },
  'electronInstallerDebian': {
    'name': 'escolascriativasdesk',
    'productName': 'Escolas Criativas Desktop'
  },
  'electronInstallerRedhat': {
    'productName': 'Escolas Criativas Desktop'
  },
  'github_repository': {
    'owner': 'escolas-criativas',
    'name': 'escolas_criativas_desktop'
  },
  'windowsStoreConfig': {
    'packageName': '',
    'name': 'desk'
  }
};