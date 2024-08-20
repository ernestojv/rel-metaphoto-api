import { Album } from "./Album";

export interface Photo {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    album: Album;
    albumId: number;
}