export interface User{
    id: number;
    name: string;
    email: string;
    address:{
        street: string;
        city: string;
        zipcode: string;
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}