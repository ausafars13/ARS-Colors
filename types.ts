
export interface ColorDetail {
  hex: string;
  name: string;
  arsCode: string;
  arsProduct: string; // The specific ARS product line this color belongs to
  percentage: number;
  description: string;
}

export interface AnalysisResult {
  colors: ColorDetail[];
  summary: string;
  productType: string;
  primaryRecommendedProduct: string; // The main recommended range for the base texture
}

export interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  project: string;
  productLine: string;
  selectedColors: string[];
  message: string;
}
