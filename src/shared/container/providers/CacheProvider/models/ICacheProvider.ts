import { NoiseReducerSpatialFilterSettings } from "aws-sdk/clients/mediaconvert";
import { NullableBoolean } from "aws-sdk/clients/xray";

export default interface ICacheProvider {
    save(key: string, value: string): Promise<void>;
    recover(key: string): Promise<string | null>;
    invalidate(key: string): Promise<void>;
}