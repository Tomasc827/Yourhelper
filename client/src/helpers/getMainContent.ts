import * as React from "react";

export const getMainContent = async <T>(
    loadingSetter: React.Dispatch<React.SetStateAction<boolean>>,
    url: string,
    errorSetter: React.Dispatch<React.SetStateAction<string>>,
    contentSetter: React.Dispatch<React.SetStateAction<T>>,
    headers?: HeadersInit
): Promise<void> => {
    loadingSetter(true);
    try {
        const response = await fetch(url, {
            method: "GET",
           headers
        });

        let data: T;

        const contentType = response.headers.get("Content-Type");

        if (contentType?.includes("application/json")) {
            data = (await response.json()) as T;
        } else if (contentType?.includes("image")) {
            data = (await response.blob()) as unknown as T;
        } else {
            throw new Error("Unsupported content type: " + contentType);
        }

        contentSetter(data)

    } catch {
        errorSetter("Server side error");
    } finally {
        loadingSetter(false);
    }
};