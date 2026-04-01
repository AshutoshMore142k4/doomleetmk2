module.exports = {
  apps: [
    {
      name: "grindsde-backend-1",
      script: "./index.js",
      env: {
        PORT: 3001,
        NODE_ENV: "production",
      },
    },
    {
      name: "grindsde-backend-2",
      script: "./index.js",
      env: {
        PORT: 3002,
        NODE_ENV: "production",
      },
    },
    {
      name: "grindsde-backend-3",
      script: "./index.js",
      env: {
        PORT: 3003,
        NODE_ENV: "production",
      },
    },
  ],
};
