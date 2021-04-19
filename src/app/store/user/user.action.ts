const PREFIX = 'USER';

export class LOG_IN_USER {
    static readonly type = `[${PREFIX}] LOG IN USER`;
    constructor(public readonly payload: any) { }
}

export class LOG_OUT_USER {
    static readonly type = `[${PREFIX}] LOG OUT USER`;
}

export class GET_CURRENCY_LIST {
    static readonly type = `[${PREFIX}] GET CURRENCY LIST`;
}

export class GET_RATE_LIST {
    static readonly type = `[${PREFIX}] GET RATE LIST`;
}

export class STORE_PREFER_CURRENCY {
    static readonly type = `[${PREFIX}] STORE PREFER CURRENCY`;
    constructor(public readonly payload: any) { }
}

export class DELETE_PREFER_CURRENCY {
    static readonly type = `[${PREFIX}] DELETE PREFER CURRENCY`;
    constructor(public readonly index: number) { }
}

