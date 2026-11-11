import { Users, Activity, MapPin, AlertCircle } from 'lucide-react';
import { StatsCard } from './StatsCard';

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="등록 어르신"
        value="1,247"
        change="전월 대비 +12명"
        changeType="increase"
        icon={Users}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-50"
      />
      <StatsCard
        title="건강 알림"
        value="23"
        change="확인 필요"
        changeType="decrease"
        icon={AlertCircle}
        iconColor="text-red-600"
        iconBgColor="bg-red-50"
      />
      <StatsCard
        title="운영 경로당"
        value="48"
        change="정상 운영 중"
        changeType="neutral"
        icon={MapPin}
        iconColor="text-emerald-600"
        iconBgColor="bg-emerald-50"
      />
      <StatsCard
        title="활동 참여율"
        value="87%"
        change="+5% 증가"
        changeType="increase"
        icon={Activity}
        iconColor="text-purple-600"
        iconBgColor="bg-purple-50"
      />
    </div>
  );
}
