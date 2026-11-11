import { Header } from './Header';
import { DashboardStats } from './DashboardStats';
import { HealthChart } from './HealthChart';
import { SeniorList } from './SeniorList';
import { RecentActivities } from './RecentActivities';
import { NoticeBoard } from './NoticeBoard';

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h1>
          <p className="text-gray-600">하동군 스마트 경로당 헬스케어 통합 관리 시스템</p>
        </div>

        <DashboardStats />

        <HealthChart />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SeniorList />
          </div>
          <div className="space-y-6">
            <RecentActivities />
          </div>
        </div>

        <NoticeBoard />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2026 하동군청. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-sm text-gray-600 hover:text-gray-900">
                개인정보처리방침
              </a>
              <a href="#terms" className="text-sm text-gray-600 hover:text-gray-900">
                이용약관
              </a>
              <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900">
                문의하기
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
