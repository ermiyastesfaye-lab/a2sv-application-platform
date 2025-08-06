
export interface ApplicationCycle{
    name:string,
    description:string,
    country:string,
    is_active:'Active'|'Closed'
    close:boolean,

}

export interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  

export interface CreateNewApplicationCycle{
    name: string;
    country: string;
    start_date: string;
    end_date: string;

}

