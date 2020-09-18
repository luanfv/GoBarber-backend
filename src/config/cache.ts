import { RedisOptions } from 'ioredis';

interface ICacheConfig {
    driver: 'redis';

    config: {
        redis: RedisOptions,
    }
}

export default {
    driver: 'redis',

    config: {
        redis: {
            host: 'localhost',
            post: 6379,
            password: undefined,
        }
    },
} as ICacheConfig;