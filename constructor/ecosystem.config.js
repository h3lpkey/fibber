module.exports = {
  apps: [{
    script: 'yarn',
    watch: true,
    name: 'constructor',
    args: 'dev',
    env: {
      "PORT": 3001,
      "NODE_ENV": "development"
    },
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'yarn && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
