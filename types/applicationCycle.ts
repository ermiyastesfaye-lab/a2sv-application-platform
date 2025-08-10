
export interface ApplicationCycle{
    name:string,
    description:string,
    country:string,
    is_active:'Active'|'Closed'
    close:boolean,
    id:string,
    refetchCycles: () => void,

}

export interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  

export interface CreateNewApplicationCycle{
    name: string;
    description: string;
    start_date: string;
    end_date: string;

}

