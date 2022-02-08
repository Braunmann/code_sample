import type { AWS } from '@serverless/typescript';

import truckApi from '@services/truck-api';
import parcelApi from '@services/parcel-api';

const serverlessConfiguration: AWS = {
  service: 'truck-service',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: {'require.resolve': undefined},
      platform: 'node',
    },
    sequelize: {
      database: '${param:DB_NAME, "truck_service_db"}',
      dialect: '${param:DB_DIALECT, "sqlite"}',
      host: '${param:DB_USERNAME, "localhost"}',
      username: '${param:DB_USERNAME, "root"}',
      password: '${param:DB_PASSWORD, null}',
      storage: '${param:DB_STORAGE, "./dev.sqlite"}'
    }
  },
  plugins: [
      'serverless-esbuild',
      'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_NAME: '${self:custom.sequelize.database}',
      DB_DIALECT: '${self:custom.sequelize.dialect}',
      DB_USERNAME: '${self:custom.sequelize.username}',
      DB_PASSWORD: '${self:custom.sequelize.password}',
      DB_HOST: '${self:custom.sequelize.host}',
      DB_STORAGE: '${self:custom.sequelize.storage}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    ...truckApi,
    ...parcelApi
  },
};

module.exports = serverlessConfiguration;
