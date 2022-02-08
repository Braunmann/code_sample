import { handlerPath } from '@libs/handlerResolver';

export default {
  parcelApiFetchAll: {
    handler: `${handlerPath(__dirname)}/handler.fetchAllHandler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'parcels'
        },
      }
    ]
  },
  parcelApiFindOne: {
    handler: `${handlerPath(__dirname)}/handler.findOneHandler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'parcels/{id}',
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
  parcelApiCreate: {
    handler: `${handlerPath(__dirname)}/handler.createHandler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'parcels',
          request: {
          },
        },
      }
    ]
  },
  parcelApiUpdate: {
    handler: `${handlerPath(__dirname)}/handler.updateHandler`,
    events: [
      {
        http: {
          method: 'patch',
          path: 'parcels/{id}',
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
  parcelApiDelete: {
    handler: `${handlerPath(__dirname)}/handler.removeHandler`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'parcels/{id}',
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
  parcelApiRelationFindAll: {
    handler: `${handlerPath(__dirname)}/handler.fetchAllRelationHandler`,
    events: [
      {
        http: {
          method: 'get',
          path: 'parcels/{id}/relationships/{relObject}',
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
  parcelApiRelationCreate: {
    handler: `${handlerPath(__dirname)}/handler.createRelationHandler`,
    events: [
      {
        http: {
          method: 'post',
          path: 'parcels/{id}/relationships/{relObject}',
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
  parcelApiRelationDelete: {
    handler: `${handlerPath(__dirname)}/handler.removeRelationHandler`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'parcels/{id}/relationships/{relObject}/{relId}',
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
