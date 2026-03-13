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

export function handleOptions(
    method: string | undefined,
    response: {
        status: (code: number) => { end: () => void };
    },
): boolean {
    if (method !== "OPTIONS") {
        return false;
    }

    response.status(204).end();
    return true;
}
