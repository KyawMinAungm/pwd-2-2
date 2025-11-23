type User = {
    id: number;
    name: string;
    username: string;
    bio?: string;
}

type Comment = {
    id: number;
    content: string;
    user: User;
}

type Post = {
    id: number;
    content: string;
    user: User;
    comments: Comment[];
}