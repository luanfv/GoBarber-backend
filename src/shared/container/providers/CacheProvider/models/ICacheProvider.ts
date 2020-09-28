import { NoiseReducerSpatialFilterSettings } from "aws-sdk/clients/mediaconvert";
import { NullableBoolean } from "aws-sdk/clients/xray";

export default interface ICacheProvider {
    save(key: string, value: any): Promise<void>;
    recover<T>(key: string): Promise<T | null>;
    invalidate(key: string): Promise<void>;
    invalidatePrefix(prefix: string): Promise<void>;
}