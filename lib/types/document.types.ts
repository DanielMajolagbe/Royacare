export enum DocumentType {
  CV = 'cv',
  PASSPORT_DATA = 'passport_data',
  PASSPORT_PHOTO = 'passport_photo',
  REFERENCE = 'reference',
  RIGHT_TO_WORK = 'right_to_work',
  PROOF_OF_ADDRESS = 'proof_of_address',
  DBS = 'dbs',
  TRAINING_CERT = 'training_cert',
  GG_DATA = 'gg_data',
  KK_DATA = 'kk_data',
  LL_DATA = 'll_data',
  MM_DATA = 'mm_data',
  NN_DATA = 'nn_data',
  QQ_DATA = 'qq_data',
  HH_DATA = 'hh_data',
  PERSONAL_PROFILE = 'PERSONAL_PROFILE',
  LOL_DATA = 'lol_data',
  LOLL_DATA = 'loll_data',
  CPR_DATA = 'cpr_data'
  
}

export interface DocumentUploadProps {
  staffId: string;
  stage: number;
  documentType: DocumentType;
  onUploadSuccess?: () => void;
  existingDocument?: Document;
}

export interface Document {
  _id: string;
  name: string;
  url: string;
  stage: number;
  status: string;
  staffId: string;
  notes?: string;
  createdAt: string;
  archived?: boolean;
} 