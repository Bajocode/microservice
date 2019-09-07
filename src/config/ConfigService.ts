import * as joi from 'joi';
import { Injectable } from '@nestjs/common';
import { ConfigSchema } from './ConfigSchema';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  public get nodeEnv(): string {
    return String(this.appConfig.NODE_ENV);
  }
  public get apiGlobalPrefix(): string {
    return String(this.appConfig.API_GLOBAL_PREFIX);
  }
  public get apiDocsDescription(): string {
    return String(this.appConfig.API_DOCS_DESCRIPTION);
  }
  public get apiDocsTitle(): string {
    return String(this.appConfig.API_DOCS_TITLE);
  }
  public get apiDocsPath(): string {
    return String(this.appConfig.API_DOCS_PATH);
  }
  public get serverDomain(): string {
    return String(this.appConfig.SERVER_DOMAIN);
  }
  public get serverPort(): string {
    return String(this.appConfig.SERVER_PORT);
  }
  public get loggerEnabled(): boolean  {
    return Boolean(this.appConfig.LOGGER_ENABLED);
  }

  private readonly appConfig: EnvConfig;

  public constructor() {
    this.appConfig = this.validateConfig<EnvConfig>(process.env, ConfigSchema.app);
  }

  private validateConfig<T>(config: T, schema: joi.ObjectSchema): T {
    const { error, value: validatedConfig } = joi.validate(config, schema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedConfig;
  }
}
