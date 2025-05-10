import * as React from "react";

export interface MainPageInterface {
    id: number | null;
    title: string;
    subtitle: string;
    postCarouselDescription: string;
    carouselHeading:string;
}

export interface ErrorState {
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export interface NavButtonInterface {
    location: string;
    name: string;
}