export class AuthNotInitializedError extends Error {
    constructor(cause?: string) {
        super("Auth not initialized, please set the config object before calling any methods.", { cause });
    }
}

export class NoSessionError extends Error {
    constructor() {
        super("No session found, please sign in first.");
    }
}

export class MfaNotSupportedError extends Error {
    constructor() {
        super("MFA is not supported for this user.");
    }
}