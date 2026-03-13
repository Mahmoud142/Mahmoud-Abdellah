export function applyCors(response: {
    setHeader: (name: string, value: string) => void;
}) {
    const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "*";

    response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    response.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    response.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type,Authorization",
    );
}

export function sendJson(
    response: {
        setHeader: (name: string, value: string) => void;
        statusCode: number;
        end: (body?: string) => void;
    },
    statusCode: number,
    payload: unknown,
) {
    response.statusCode = statusCode;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify(payload));
}

export function handleOptions(
    method: string | undefined,
    response: {
        statusCode: number;
        end: () => void;
    },
): boolean {
    if (method !== "OPTIONS") {
        return false;
    }

    response.statusCode = 204;
    response.end();
    return true;
}
