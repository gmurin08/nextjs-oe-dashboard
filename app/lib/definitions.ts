
export type User = {
    guid: string;
    member_id:string;
    ssn:string;
    dob:Date;
    name: string;
    email: string;
    password: string;
    class: 'participant'|'admin'|'vault';
    isContractor:boolean;
}

export type Statement = {
    uuid:string;
    user_id:string;
    benefit_from:Date;
    work_from:Date;
    payment_due:Date;
    total_contribution:string;
    reserve:string;
    amount_due:string;
}

export type VaultDoc = {
    uuid:string;
    user_id:string
    category:'todo'|'annuity'|'audit'|'benefit'|'legal'|'other'|'pension'|'remittance'|'statements'|'welfare'
    url:string
}

export type Contribution = {
    uuid:string;
    user_id:string;
    amount:string;
    hours:string;
    period:Date; 
}