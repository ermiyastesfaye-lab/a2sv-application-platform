
interface AnalyticsType {
  acceptance_rate: number;
  application_funnel: {
    submitted: number;
    pending_review: number;
    in_progress: number;
  };
  average_review_time_days: number;
  country_distribution: Record<string, number>;
  school_distribution: Record<string, number>;
  total_applicants: number;
  message: string;
  success: boolean;
}
export interface Bar1Type{
acceptance_rate: number;
  application_funnel: {
    submitted: number;
    pending_review: number;
    in_progress: number;
  };
}
export interface Bar2Type{
    country_distribution: Record<string, number>;
}
export interface DonutChartType{
    school_distribution: Record<string,number>
}
export interface AnalyticsResponse {
  success: boolean;
  message: string;
  data: AnalyticsType;
}

