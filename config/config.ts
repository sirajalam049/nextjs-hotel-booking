import DefaultConfig from 'config.json';

export type ConfigurationKeys = keyof typeof DefaultConfig;

export type Config = Record<ConfigurationKeys, string>;

let envConfig: Config = {} as Config;
let defaultConfig: Config = DefaultConfig;

if (process.env.NODE_ENV) {
    const env = process.env.NODE_ENV.trim();
    envConfig = require(`../config.${env}.json`);
}


const config = {
    get: (key: ConfigurationKeys) => envConfig[key] || defaultConfig[key]
}


export default config;