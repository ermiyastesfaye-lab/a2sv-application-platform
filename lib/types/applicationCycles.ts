export interface CreateCycleRequest {
  name: string;
  start_date: string;
  end_date: string;
  country?: string;
}
// {
//   "success": true,
//   "data": {
//       "id": 1,
//       "name": "G7 Intake",
//       "start_date": "2025-07-18",
//       "end_date": "2025-07-19",
//       "is_active": true,
//       "created_at": "2025-07-25T23:04:47.117922+03:00"
//   },
//   "message": "Cycle G7 Intake is now active."
// }

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
  description: string;
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
