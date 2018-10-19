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
    'icon': 'public/logo.png'
  },
  'electronWinstallerConfig': {
    'name': 'desk'
  },
  'electronInstallerDebian': {},
  'electronInstallerRedhat': {},
  'github_repository': {
    'owner': '',
    'name': ''
  },
  'windowsStoreConfig': {
    'packageName': '',
    'name': 'desk'
  }
};