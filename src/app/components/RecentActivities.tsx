import { Activity, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'check' | 'alert' | 'info' | 'success';
  title: string;
  description: string;
  time: string;
  center?: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'alert',
    title: '혈압 이상 감지',
    description: '정미순 어르신 (하동읍 경로당)',
    time: '10분 전',
    center: '하동읍 경로당'
  },
  {
    id: '2',
    type: 'success',
    title: '건강체크 완료',
    description: '악양면 경로당 - 오늘 32명 체크 완료',
    time: '1시간 전',
    center: '악양면 경로당'
  },
  {
    id: '3',
    type: 'info',
    title: '신규 어르신 등록',
    description: '진교면 경로당 - 3명 신규 등록',
    time: '2시간 전',
    center: '진교면 경로당'
  },
  {
    id: '4',
    type: 'check',
    title: '정기 건강검진 예정',
    description: '금남면 경로당 - 내일 오전 10시',
    time: '3시간 전',
    center: '금남면 경로당'
  },
  {
    id: '5',
    type: 'success',
    title: '보호자 연락 완료',
    description: '박순자 어르신 - 보호자 확인 완료',
    time: '4시간 전'
  }
];

function getActivityIcon(type: ActivityItem['type']) {
  switch (type) {
    case 'alert':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case 'success':
      return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    case 'info':
      return <Info className="w-5 h-5 text-blue-500" />;
    case 'check':
      return <Activity className="w-5 h-5 text-purple-500" />;
  }
}

function getActivityBgColor(type: ActivityItem['type']) {
  switch (type) {
    case 'alert':
      return 'bg-red-50';
    case 'success':
      return 'bg-emerald-50';
    case 'info':
      return 'bg-blue-50';
    case 'check':
      return 'bg-purple-50';
  }
}

export function RecentActivities() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">최근 활동</h2>
          <p className="text-sm text-gray-600 mt-1">실시간 모니터링 현황</p>
        </div>
        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          전체보기
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${getActivityBgColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
