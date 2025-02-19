module.exports = {
  apps: [
    {
      name: "app",
      script: "dist/app.js",
      watch: true,
      env: {
        PORT: 3300,
        API_URL: "http://localhost:3300/",
        CLIENT_URL: "http://localhost:5173/",
        DB_URL:
          "mongodb+srv://root:Zinzin2021@cluster0.15ltb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        JWT_REFRESH_SECRET: "secret-jwt-ref-token",
        JWT_ACCESS_SECRET: "secret-jwt-token",
        SMTP_HOST: "smtp.yandex.ru",
        SMTP_PORT: 587,
        SMTP_USER: "wannaseemyguts@yandex.ru",
        SMTP_PASSWORD: "fhfwaqgzvrqvvfvi",
      },
    },
  ],
};
