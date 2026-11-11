import { Search, UserPlus, Download, Filter, Mail, Phone, MapPin, MoreVertical, Edit, Trash2 } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  age: number;
  gender: string;
  center: string;
  registerDate: string;
  guardian: string;
  guardianPhone: string;
  guardianEmail: string;
  status: 'active' | 'inactive';
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: '김영희',
    age: 78,
    gender: '여',
    center: '하동읍 경로당',
    registerDate: '2024-01-15',
    guardian: '김철수',
    guardianPhone: '010-1234-5678',
    guardianEmail: 'kim@email.com',
    status: 'active'
  },
  {
    id: '2',
    name: '박순자',
    age: 82,
    gender: '여',
    center: '악양면 경로당',
    registerDate: '2024-02-20',
    guardian: '박민수',
    guardianPhone: '010-2345-6789',
    guardianEmail: 'park@email.com',
    status: 'active'
  },
  {
    id: '3',
    name: '이철호',
    age: 75,
    gender: '남',
    center: '진교면 경로당',
    registerDate: '2024-03-10',
    guardian: '이영희',
    guardianPhone: '010-3456-7890',
    guardianEmail: 'lee@email.com',
    status: 'active'
  },
  {
    id: '4',
    name: '정미순',
    age: 80,
    gender: '여',
    center: '하동읍 경로당',
    registerDate: '2023-11-05',
    guardian: '정호진',
    guardianPhone: '010-4567-8901',
    guardianEmail: 'jung@email.com',
    status: 'active'
  },
  {
    id: '5',
    name: '최동식',
    age: 77,
    gender: '남',
    center: '금남면 경로당',
    registerDate: '2024-04-12',
    guardian: '최은지',
    guardianPhone: '010-5678-9012',
    guardianEmail: 'choi@email.com',
    status: 'active'
  },
  {
    id: '6',
    name: '한복순',
    age: 85,
    gender: '여',
    center: '악양면 경로당',
    registerDate: '2023-09-22',
    guardian: '한상민',
    guardianPhone: '010-6789-0123',
    guardianEmail: 'han@email.com',
    status: 'inactive'
  }
];

export function MemberManagement() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">회원관리</h1>
        <p className="text-gray-600">등록된 어르신과 보호자 정보를 관리합니다</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">1,247</h3>
          <p className="text-sm text-gray-600">총 회원 수</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-3 rounded-lg">
              <UserPlus className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">1,205</h3>
          <p className="text-sm text-gray-600">활성 회원</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <UserPlus className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">42</h3>
          <p className="text-sm text-gray-600">비활성 회원</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <UserPlus className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">18</h3>
          <p className="text-sm text-gray-600">이번 달 신규</p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="이름, 경로당, 보호자로 검색..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">필터</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">내보내기</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium">회원 추가</span>
              </button>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  회원 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  경로당
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  보호자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가입일
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
              {mockMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">
                          {member.age}세 · {member.gender}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{member.center}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.guardian}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Phone className="w-3 h-3" />
                          {member.guardianPhone}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Mail className="w-3 h-3" />
                          {member.guardianEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.registerDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        member.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {member.status === 'active' ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            총 <span className="font-medium">1,247</span>명 중 <span className="font-medium">1-6</span>명 표시
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              이전
            </button>
            <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
