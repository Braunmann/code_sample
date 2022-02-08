# Serverless - AWS Node.js Typescript - Over complicated Truck API

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npm run dev` to start serverless offline for deployment purposes
- Run `npm run test` to start tests

### Starting Idea
Create API with some ideas
- Create rich data model
- Separate DB Structure from business logic 
- Use DTO pattern to stabilize contracts 
- Repository and Adapter pattern to allow for switching ORM and DB
- Use Value Objects Pattern

### Remarks

- Totally overcomplicated design
- Handler completely to rebuild 
- Missing integration tests
- Missing of unit test in relationships
- Saving Truck with relationship with parcel doesn't work properly
- missing JSON schema declaration for all handlers to valid input data against