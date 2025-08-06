
export interface ApplicationCycle{
    cycleName:string,
    intake:string,
    country:string,
    status:'Active'|'Closed'
    close:boolean,

}



export interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  

export interface CreateNewApplicationCycle{
    cycleName:string,
    startDate:string,
    endDate:string
    country:string,

}

