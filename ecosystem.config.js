module.exports = {
  apps: [
    {
      name: "meal-backend",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3020,
        PRICE_FIRST: 10,
        PRICE_SECOND: 30,
        APP_URL: 'http://meal.fusionworks.md/',
        SMS_ID: '29225',
        // MAIL_ACC: 'mail',
        // PHONE: 'phone',
        // SMS_KEY: 'key'
        // MAIL_PASS: 'pass'
      }
    }
  ],
}