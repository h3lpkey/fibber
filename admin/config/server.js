module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '2969afe4ebb113b342c7f19e3d9c8053'),
    },
    host: "localhost", // only used along with `strapi develop --watch-admin` command
    port: 3001,
  },
});
