import { handlerPath } from '@libs/handlerResolver';

export default {
  truckApiFetchAll: {
    handler: `${handlerPath(__dirname)}/handler.fetchAllHandler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'trucks'
        },
      }
    ]
  },
  truckApiFindOne: {
    handler: `${handlerPath(__dirname)}/handler.findOneHandler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'trucks/{id}',
          request: {
            parameters: {
              paths: {
                id: true
              }
            }
          },
        },
      }
    ]
  },
  truckApiCreate: {
    handler: `${handlerPath(__dirname)}/handler.createHandler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'trucks',
          request: {
          },
        },
      }
    ]
  },
  truckApiUpdate: {
    handler: `${handlerPath(__dirname)}/handler.updateHandler`,
    events: [
      {
        http: {
          method: 'patch',
          path: 'trucks/{id}',
          request: {
            parameters: {
              paths: {
                id: true
              }
            }
          },
        },
      }
    ]
  },
  truckApiDelete: {
    handler: `${handlerPath(__dirname)}/handler.removeHandler`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'trucks/{id}',
          request: {
            parameters: {
              paths: {
                id: true
              }
            }
          },
        },
      }
    ]
  },
  // Relations
  truckApiRelationFindAll: {
    handler: `${handlerPath(__dirname)}/handler.fetchAllRelationHandler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'trucks/{id}/relationships/{relObject}',
          request: {
            parameters: {
              paths: {
                id: true,
                relObject: true
              }
            }
          },
        },
      }
    ]
  },
  truckApiRelationCreate: {
    handler: `${handlerPath(__dirname)}/handler.createRelationHandler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'trucks/{id}/relationships/{relObject}',
          request: {
            parameters: {
              paths: {
                id: true,
                relObject: true
              }
            }
          },
        },
      }
    ]
  },
  truckApiRelationDelete: {
    handler: `${handlerPath(__dirname)}/handler.removeRelationHandler`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'trucks/{id}/relationships/{relObject}/{relId}',
          request: {
            parameters: {
              paths: {
                id: true,
                relObject: true,
                relId: true
              }
            }
          },
        },
      }
    ]
  }
}
