
export type FieldType = 'text' | 'longtext' | 'number' | 'date' | 'select' | 'checkbox' | 'image' | 'section';
export type FormCategory = 'public' | 'internal';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[]; // For select/checkbox
  placeholder?: string;
  order: number;
  sectionId?: string; // Para agrupar em blocos
}

export interface Form {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: FormCategory;
  status: 'draft' | 'active' | 'archived';
  fields: FormField[];
  createdAt: number;
}

export interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate?: string;
  notes?: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  clientId?: string;
  answers: Record<string, any>;
  submittedAt: number;
}

export type BlockType = 'header' | 'text' | 'answers' | 'image' | 'footer';

export interface PdfBlock {
  id: string;
  type: BlockType;
  config: any;
  order: number;
  visible: boolean;
}

export interface PdfTemplate {
  id: string;
  formId: string;
  name: string;
  blocks: PdfBlock[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  professionalTitle?: string;
  logoUrl?: string;
  signatureUrl?: string;
}
