import { Heart, Activity, TrendingUp, AlertCircle, Download, Calendar, Filter, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface HealthRecord {
  id: string;
  memberName: string;
  age: number;
  center: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  checkDate: string;
  status: 'normal' | 'warning' | 'critical';
  notes?: string;
}

const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    memberName: '김영희',
    age: 78,
    center: '하동읍 경로당',
    bloodPressure: '125/82',
    heartRate: 72,
    temperature: 36.5,
    checkDate: '2026-05-29 09:30',
    status: 'normal'
  },
  {
    id: '2',
    memberName: '박순자',
    age: 82,
    center: '악양면 경로당',
    bloodPressure: '145/95',
    heartRate: 88,
    temperature: 36.8,
    checkDate: '2026-05-29 09:15',
    status: 'warning',
    notes: '혈압 높음, 재측정 필요'
  },
  {
    id: '3',
    memberName: '이철호',
    age: 75,
    center: '진교면 경로당',
    bloodPressure: '118/76',
    heartRate: 68,
    temperature: 36.4,
    checkDate: '2026-05-29 09:00',
    status: 'normal'
  },
  {
    id: '4',
    memberName: '정미순',
    age: 80,
    center: '하동읍 경로당',
    bloodPressure: '162/98',
    heartRate: 95,
    temperature: 37.2,
    checkDate: '2026-05-29 08:45',
    status: 'critical',
    notes: '고혈압 및 미열, 보호자 연락 완료'
  },
  {
    id: '5',
    memberName: '최동식',
    age: 77,
    center: '금남면 경로당',
    bloodPressure: '122/80',
    heartRate: 70,
    temperature: 36.6,
    checkDate: '2026-05-29 08:30',
    status: 'normal'
  }
];

const vitalTrendData = [
  { date: '05/23', 평균혈압: 128, 평균심박: 74, 이상건수: 5 },
  { date: '05/24', 평균혈압: 126, 평균심박: 72, 이상건수: 3 },
  { date: '05/25', 평균혈압: 130, 평균심박: 76, 이상건수: 7 },
  { date: '05/26', 평균혈압: 125, 평균심박: 71, 이상건수: 4 },
  { date: '05/27', 평균혈압: 127, 평균심박: 73, 이상건수: 6 },
  { date: '05/28', 평균혈압: 129, 평균심박: 75, 이상건수: 5 },
  { date: '05/29', 평균혈압: 131, 평균심박: 77, 이상건수: 8 }
];

const healthStatusData = [
  { category: '정상', 인원: 1142 },
  { category: '주의', 평균: 78 },
  { category: '긴급', 인원: 27 }
];

function getStatusColor(status: HealthRecord['status']) {
  switch (status) {
    case 'normal':
      return 'bg-emerald-100 text-emerald-700';
    case 'warning':
      return 'bg-yellow-100 text-yellow-700';
    case 'critical':
      return 'bg-red-100 text-red-700';
  }
}

function getStatusText(status: HealthRecord['status']) {
  switch (status) {
    case 'normal':
      return '정상';
    case 'warning':
      return '주의';
    case 'critical':
      return '긴급';
  }
}

export function HealthInfoManagement() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">건강 정보 관리</h1>
        <p className="text-gray-600">어르신들의 건강 데이터를 실시간으로 모니터링하고 관리합니다</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">1,142</h3>
          <p className="text-sm text-gray-600">정상 상태</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">91.6%</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">78</h3>
          <p className="text-sm text-gray-600">주의 필요</p>
          <p className="text-xs text-yellow-600 font-medium mt-1">6.3%</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-50 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">27</h3>
          <p className="text-sm text-gray-600">긴급 대응</p>
          <p className="text-xs text-red-600 font-medium mt-1">2.1%</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">8</h3>
          <p className="text-sm text-gray-600">오늘 이상 감지</p>
          <p className="text-xs text-blue-600 font-medium mt-1">확인 필요</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">주간 건강 지표 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vitalTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="평균혈압"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="평균심박"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="이상건수"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">건강 상태 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={healthStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="인원" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Health Records Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">최근 건강 체크 기록</h2>
              <p className="text-sm text-gray-600 mt-1">실시간 업데이트</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">기간 선택</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">필터</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">내보내기</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  회원 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  혈압
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  심박수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  체온
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  측정 시간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  동작
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockHealthRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {record.memberName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{record.memberName}</p>
                        <p className="text-sm text-gray-500">{record.center}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-gray-900">{record.bloodPressure}</span>
                      <span className="text-xs text-gray-500">mmHg</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-gray-900">{record.heartRate}</span>
                      <span className="text-xs text-gray-500">bpm</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{record.temperature}°C</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status === 'critical' && <AlertCircle className="w-3 h-3" />}
                      {getStatusText(record.status)}
                    </span>
                    {record.notes && (
                      <p className="text-xs text-gray-500 mt-1">{record.notes}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                      <Eye className="w-4 h-4" />
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            최근 <span className="font-medium">5</span>건 표시
          </p>
          <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            전체 기록 보기
          </button>
        </div>
      </div>
    </div>
  );
}
