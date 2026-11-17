import { DashboardStats } from '../components/DashboardStats';
import { HealthChart } from '../components/HealthChart';
import { SeniorList } from '../components/SeniorList';
import { RecentActivities } from '../components/RecentActivities';
import { NoticeBoard } from '../components/NoticeBoard';

export function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">메인 대시보드</h1>
        <p className="text-gray-600">스마트 경로당 헬스케어 통합 관리 시스템</p>
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
    </div>
  );
}
