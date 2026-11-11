import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { name: '월', 참여인원: 156, 건강체크: 142 },
  { name: '화', 참여인원: 168, 건강체크: 155 },
  { name: '수', 참여인원: 175, 건강체크: 168 },
  { name: '목', 참여인원: 162, 건강체크: 159 },
  { name: '금', 참여인원: 180, 건강체크: 172 },
  { name: '토', 참여인원: 145, 건강체크: 138 },
  { name: '일', 참여인원: 130, 건강체크: 125 }
];

const healthTrendData = [
  { month: '11월', 정상: 1150, 주의: 45, 긴급: 8 },
  { month: '12월', 정상: 1168, 주의: 38, 긴급: 5 },
  { month: '1월', 정상: 1182, 주의: 42, 긴급: 7 },
  { month: '2월', 정상: 1175, 주의: 48, 긴급: 12 },
  { month: '3월', 정상: 1190, 주의: 35, 긴급: 6 },
  { month: '4월', 정상: 1205, 주의: 28, 긴급: 4 },
  { month: '5월', 정상: 1218, 주의: 25, 긴급: 4 }
];

export function HealthChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">주간 활동 현황</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#6b7280" />
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
              dataKey="참여인원"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="건강체크"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">건강상태 추이</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={healthTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="정상" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="주의" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="긴급" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
