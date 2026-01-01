export interface Address {
    city?: string;
    country?: string;
}

export interface UserEntity {
    _id: string;
    email: string;
    profile?: UserProfile;
}


export interface Education {
    id: string;
    school: string;
    degree: string;
    year: number;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    years: number;
}

export interface UserProfile {
    name?: string;
    skills?: string[];
    address?: Address;
    education?: Education[];
    experience?: Experience[];
}


// export interface UserProfile {
//     name?: string;
//     skills?: string[];
//     education?: Education[];
//     experience?: Experience[];
// }


// export interface Education {
//     school: string;
//     degree: string;
//     year: number;
// }

// export interface Experience {
//     company: string;
//     role: string;
//     years: number;
// }

