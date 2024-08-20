import { User } from "./User";

export interface Album {
    user: User;
    userId: number;
    id: number;
    title: string;
}