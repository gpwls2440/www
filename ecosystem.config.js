module.exports = {
  apps: [
    {
      name: 'www',
      // package.json에 정의된 npm run start를 실행하게 해서 PM2로 관리하게 한다.
      script: 'npm',
      args: 'run start',
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // 개발 환경에서 적용될 설정
      // pm2 start ecosystem.config.js
      env: {
        PORT: 8080,
        NODE_ENV: 'development'
      },
      // 배포 환경에서 적용될 설정
      // pm2 start ecosystem.config.js --env production
      env_production: {
        PORT: 80,
        NODE_ENV: 'production'
      },
      output: './logs/console.log',
      error: './logs/consoleError.log'
    }
  ],

  deploy: {
    development: {
      user: 'root',
      host: [{ host: 'ec2-3-36-54-206.ap-northeast-2.compute.amazonaws.com', port: '10022' }],
      ref: 'origin/master',
      repo: 'git@github.com:gpwls2440/www.git',
      path: '/ellex/application/resources/',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env develpment'
    },
    production: {}
  }
}
