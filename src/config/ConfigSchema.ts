import * as joi from 'joi';

export class ConfigSchema {
  public static app: joi.ObjectSchema = joi.object({
    NODE_ENV: joi.string()
      .valid(['development', 'production', 'test', 'provision'])
      .default('development'),
    API_GLOBAL_PREFIX: joi.string()
      .default('api/v1'),
    API_DOCS_DESCRIPTION: joi.string()
      .default('This Microservice can be used to...'),
    API_DOCS_TITLE: joi.string()
      .default('Microservice'),
    API_DOCS_PATH: joi.string()
      .default('/swagger'),
    SERVER_DOMAIN: joi.string()
      .default('0.0.0.0'),
    SERVER_PORT: joi.string()
      .default(5000),
    LOGGER_ENABLED: joi.boolean()
      .truthy('TRUE').truthy('true').truthy('1')
      .falsy('FALSE').falsy('false').falsy('0')
      .default(true),
  }).unknown()
    .required();
}
