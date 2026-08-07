export interface CaseItem {
  id: string;
  title: string;
  category: string;
  stage: string;
  party1: string;
  party1Type: string;
  party2: string;
  party2Type: string;
  statusKey: 'urgent' | 'ongoing' | 'finished';
  nextDateDays: number;
  nextDateType: string;
}
