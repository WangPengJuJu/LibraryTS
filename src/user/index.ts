export interface User {
    name: string;
    age: number;
}

let user: User;
export const setUser = (value: User) => {
    user = value;
};

