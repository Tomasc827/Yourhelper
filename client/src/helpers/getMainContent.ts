import * as React from "react";

export const getMainContent = async <T>(
    loadingSetter: React.Dispatch<React.SetStateAction<boolean>>,
    url: string,
    errorSetter: React.Dispatch<React.SetStateAction<string>>,
    contentSetter: React.Dispatch<React.SetStateAction<T>>
): Promise<void> => {
    loadingSetter(true);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json() as T;
        contentSetter(data);
    } catch {
        errorSetter("Server side error");
    } finally {
        loadingSetter(false);
    }
};