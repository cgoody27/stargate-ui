/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // add other env variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function http<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
    const res = await fetch(input, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers ?? {})
        }
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json() as Promise<T>;
}

export const api = {
    get: <T>(path: string) => http<T>(`${BASE_URL}${path}`),
    post: <T>(path: string, body?: unknown) =>
        http<T>(`${BASE_URL}${path}`, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
    put: <T>(path: string, body?: unknown) =>
        http<T>(`${BASE_URL}${path}`, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
};