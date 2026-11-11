import { Activity, Heart, Phone, MapPin } from 'lucide-react';

interface Senior {
  id: string;
  name: string;
  age: number;
  center: string;
  healthStatus: 'good' | 'warning' | 'alert';
  lastCheckup: string;
  guardian: string;
  guardianPhone: string;
}

const mockSeniors: Senior[] = [
  {
    id: '1',
    name: '김영희',
    age: 78,
    center: '하동읍 경로당',
    healthStatus: 'good',
    lastCheckup: '2026-05-28',
    guardian: '김철수',
    guardianPhone: '010-1234-5678'
  },
  {
    id: '2',
    name: '박순자',
    age: 82,
    center: '악양면 경로당',
    healthStatus: 'warning',
    lastCheckup: '2026-05-27',
    guardian: '박민수',
    guardianPhone: '010-2345-6789'
  },
  {
    id: '3',
    name: '이철호',
    age: 75,
    center: '진교면 경로당',
    healthStatus: 'good',
    lastCheckup: '2026-05-28',
    guardian: '이영희',
    guardianPhone: '010-3456-7890'
  },
  {
    id: '4',
    name: '정미순',
    age: 80,
    center: '하동읍 경로당',
    healthStatus: 'alert',
    lastCheckup: '2026-05-26',
    guardian: '정호진',
    guardianPhone: '010-4567-8901'
  },
  {
    id: '5',
    name: '최동식',
    age: 77,
    center: '금남면 경로당',
    healthStatus: 'good',
    lastCheckup: '2026-05-29',
    guardian: '최은지',
    guardianPhone: '010-5678-9012'
  }
];

function getStatusColor(status: Senior['healthStatus']) {
  switch (status) {
    case 'good':
      return 'bg-emerald-100 text-emerald-700';
    case 'warning':
      return 'bg-yellow-100 text-yellow-700';
    case 'alert':
      return 'bg-red-100 text-red-700';
  }
}

function getStatusText(status: Senior['healthStatus']) {
  switch (status) {
    case 'good':
      return '양호';
    case 'warning':
      return '주의';
    case 'alert':
      return '긴급';
  }
}

export function SeniorList() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">어르신 건강 현황</h2>
        <p className="text-sm text-gray-600 mt-1">최근 건강 체크 데이터 기준</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이름 / 나이
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                경로당
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                건강상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                최근 체크
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                보호자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                동작
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockSeniors.map((senior) => (
              <tr key={senior.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {senior.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{senior.name}</p>
                      <p className="text-sm text-gray-500">{senior.age}세</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{senior.center}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      senior.healthStatus
                    )}`}
                  >
                    <Heart className="w-3 h-3" />
                    {getStatusText(senior.healthStatus)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {senior.lastCheckup}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{senior.guardian}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {senior.guardianPhone}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
