import { Calendar, Pin } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  isPinned: boolean;
  category: string;
}

const notices: Notice[] = [
  {
    id: '1',
    title: '6월 정기 건강검진 안내',
    content: '6월 1일부터 15일까지 각 경로당별 순회 건강검진이 진행됩니다.',
    date: '2026-05-25',
    isPinned: true,
    category: '중요'
  },
  {
    id: '2',
    title: '스마트 헬스케어 디바이스 교육',
    content: '보호자 대상 건강관리 앱 사용법 교육을 실시합니다.',
    date: '2026-05-23',
    isPinned: true,
    category: '교육'
  },
  {
    id: '3',
    title: '여름철 건강관리 주의사항',
    content: '무더운 날씨에 대비한 어르신 건강관리 가이드라인을 공유합니다.',
    date: '2026-05-20',
    isPinned: false,
    category: '안내'
  },
  {
    id: '4',
    title: '5월 활동 우수 경로당 선정',
    content: '악양면, 진교면 경로당이 이달의 우수 경로당으로 선정되었습니다.',
    date: '2026-05-18',
    isPinned: false,
    category: '공지'
  }
];

export function NoticeBoard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">공지사항</h2>
          <p className="text-sm text-gray-600 mt-1">주요 안내 및 소식</p>
        </div>
        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          전체보기
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              {notice.isPinned && (
                <Pin className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                    {notice.category}
                  </span>
                  {notice.isPinned && (
                    <span className="text-xs font-medium text-emerald-600">고정됨</span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {notice.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{notice.content}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{notice.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
