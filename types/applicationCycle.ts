
export interface ApplicationCycle{
    cycleName:string,
    intake:string,
    country:string,
    status:'Active'|'Closed'
    close:boolean,

}

export interface CreateNewApplicationCycle{
    cycleName:string,
    startDate:string,
    endDate:string
    country:string,

}