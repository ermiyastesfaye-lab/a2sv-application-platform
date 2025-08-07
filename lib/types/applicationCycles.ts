export interface CreateCycleRequest {
    name: string;
    start_date: string;
    end_date: string;
    country?: string; 
  }
  
  export interface CycleResponse {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    created_at: string;
    message: string;
  }
  
  export interface Cycle {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    created_at: string;
  }
  

  export interface CycleData {
    cycles: Cycle[];
    total_count: number;
    page: number;
    limit: number;
  }
  
  export interface GetCycleResponse {
    success: boolean;
  data: CycleData;
  message: string;
  }
  