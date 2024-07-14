export class List_Users{
    users : User_Info[]
    totalUsersCount : number
}

export class User_Info{
    id : string;
    email : string;
    nameSurname : string;
    userName : string;
    twoFactorEnabled : boolean;
}