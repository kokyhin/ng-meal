module.exports = {
  apps: [
    {
      name: "meal-backend",
      script: "node server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3020,
        PRICE_FIRST: 10,
        PRICE_SECOND: 30,
        APP_URL: 'http://meal.fusionworks.md/',
        MAIL_ACC: 'fwmeal@gmail.com',
        // MAIL_PASS: 'pass'
      }
    }
  ],
}