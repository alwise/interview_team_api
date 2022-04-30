export type InviteStatus = 'Sent' | 'Pending' | 'Accepted' | 'Failed' | 'Rejected';
type Role= 'owner' |'member'
export interface UserInt{
    uid?:string;
    name?:string;
    email?:string;
    username?:string;
    profilePhoto?:string;
    password?:string;
}

export interface TeamInt{
    id?:string;
    name?:string;
    // ownerId?:string
}


export interface TeamMemberInt{
    id?:string;
    userId?:string;
    teamId?:string,
    role?:Role,
}

export interface InviteInt{
    id?:string;
    teamId?:string;
    email?:string;
    status?:InviteStatus
    metadata?:JSON

}




