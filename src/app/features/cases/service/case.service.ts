import { Service, signal } from '@angular/core';
import { ApiResponse } from '../../../core/models/api-response';
import { CaseItem } from '../models/cases';

@Service()
export class CaseService {
  private readonly mockApiDatabase: Record<number, CaseItem[]> = {
    1: [
      {
        id: '12345/2026',
        title: 'نزاع تجاري - شركة المستقبل',
        category: 'العمالية - الرياض',
        stage: 'جلسات',
        party1: 'محمد بن علي..',
        party1Type: 'فرد',
        party2: 'يوسف القاضي..',
        party2Type: 'شركة',
        statusKey: 'urgent',
        nextDateDays: 23,
        nextDateType: 'إستئناف'
      },
      {
        id: '12347/2026',
        title: 'نزاع تجاري - شركة المستقبل',
        category: 'العمالية - الرياض',
        stage: 'رفع دعوى',
        party1: 'محمد بن علي..',
        party1Type: 'متعدد',
        party2: 'يوسف القاضي..',
        party2Type: 'شركة',
        statusKey: 'ongoing',
        nextDateDays: 12,
        nextDateType: 'جلسة'
      },
      {
        id: '12349/2026',
        title: 'نزاع تجاري - شركة المستقبل',
        category: 'العمالية - الرياض',
        stage: 'حكم',
        party1: 'محمد بن علي..',
        party1Type: 'فرد',
        party2: 'يوسف القاضي..',
        party2Type: 'شركة',
        statusKey: 'finished',
        nextDateDays: 34,
        nextDateType: 'الجلسة الأولى'
      },
      {
        id: '12348/2026',
        title: 'نزاع تجاري - شركة المستقبل',
        category: 'العمالية - الرياض',
        stage: 'جلسات',
        party1: 'محمد بن علي..',
        party1Type: 'فرد',
        party2: 'يوسف القاضي..',
        party2Type: 'شركة',
        statusKey: 'urgent',
        nextDateDays: 32,
        nextDateType: 'إستئناف'
      }
    ],
    2: [
      {
        id: '12351/2026',
        title: 'نزاع عقاري - مجموعة الرياض',
        category: 'التجارية - جدة',
        stage: 'محكمة',
        party1: 'أحمد السعيد..',
        party1Type: 'متعدد',
        party2: 'شركة الأعمار..',
        party2Type: 'شركة',
        statusKey: 'ongoing',
        nextDateDays: 19,
        nextDateType: 'إستئناف'
      },
      {
        id: '12346/2026',
        title: 'نزاع عقاري - مجموعة الرياض',
        category: 'التجارية - جدة',
        stage: 'محكمة',
        party1: 'أحمد السعيد..',
        party1Type: 'فرد',
        party2: 'شركة الأعمار..',
        party2Type: 'شركة',
        statusKey: 'finished',
        nextDateDays: 23,
        nextDateType: 'إستئناف'
      },
      {
        id: '12352/2026',
        title: 'قضية عمالية - موسسة الأفق',
        category: 'العمالية - الدمام',
        stage: 'جلسات',
        party1: 'خالد المطيري..',
        party1Type: 'فرد',
        party2: 'مؤسسة الأفق..',
        party2Type: 'شركة',
        statusKey: 'urgent',
        nextDateDays: 4,
        nextDateType: 'إستئناف'
      },
      {
        id: '12353/2026',
        title: 'قضية عمالية - موسسة الأفق',
        category: 'العمالية - الدمام',
        stage: 'جلسات',
        party1: 'خالد المطيري..',
        party1Type: 'متعدد',
        party2: 'مؤسسة الأفق..',
        party2Type: 'شركة',
        statusKey: 'urgent',
        nextDateDays: 67,
        nextDateType: 'إستئناف'
      }
    ]
  };

  getCases(page: number): ApiResponse<CaseItem> {
    const pageData = this.mockApiDatabase[page];

    return {
      data: pageData,
      pagination: {
        totalItems: 8,
        currentPage: page,
        pageSize: 4
      }
    };
  }
}
