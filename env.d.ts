import { Club } from "./appsync/API";

declare module global {
    declare namespace NodeJS {
        interface ProcessEnv {
            // Declare your process environment variables here
            readonly EXPO_ENV: string;
        }
    }
}

export { }