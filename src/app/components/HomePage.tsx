import { Heart, Shield, BarChart3, Users, Smartphone, Bell, CheckCircle, ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900">하동군 스마트 경로당</h1>
                <p className="text-xs text-gray-500">헬스케어 포털</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#about" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                소개
              </a>
              <a href="#features" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                기능
              </a>
              <a href="#access" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                접속하기
              </a>
              <Link to="/admin" className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                로그인
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4" fill="currentColor" />
                스마트 헬스케어 시스템
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                하동군 어르신들의<br />
                건강한 일상을 위한<br />
                <span className="text-emerald-600">스마트 케어 시스템</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                48개 경로당, 1,247명의 어르신을 실시간으로 모니터링하고<br />
                보호자, 보건소, 관계자가 함께 만드는 안전한 건강 관리
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2">
                  시작하기
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  자세히 알아보기
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-6">
                    <Users className="w-8 h-8 text-emerald-600 mb-3" />
                    <p className="text-3xl font-bold text-gray-900 mb-1">1,247</p>
                    <p className="text-sm text-gray-600">등록 어르신</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <MapPin className="w-8 h-8 text-blue-600 mb-3" />
                    <p className="text-3xl font-bold text-gray-900 mb-1">48</p>
                    <p className="text-sm text-gray-600">운영 경로당</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-6">
                    <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
                    <p className="text-3xl font-bold text-gray-900 mb-1">87%</p>
                    <p className="text-sm text-gray-600">참여율</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6">
                    <Bell className="w-8 h-8 text-red-600 mb-3" />
                    <p className="text-3xl font-bold text-gray-900 mb-1">23</p>
                    <p className="text-sm text-gray-600">건강 알림</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">주요 기능</h2>
            <p className="text-xl text-gray-600">
              첨단 기술로 어르신의 건강을 지키는 통합 관리 시스템
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-emerald-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">실시간 건강 모니터링</h3>
              <p className="text-gray-600 leading-relaxed">
                혈압, 심박수, 활동량 등 어르신의 건강 상태를 실시간으로 확인하고 이상 징후 발생 시 즉시 알림을 받을 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">모바일 접근성</h3>
              <p className="text-gray-600 leading-relaxed">
                언제 어디서나 스마트폰으로 어르신의 건강 정보를 확인하고 보호자에게 신속하게 연락할 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-purple-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">데이터 분석 리포트</h3>
              <p className="text-gray-600 leading-relaxed">
                건강 데이터를 시각화하여 추이를 파악하고 맞춤형 건강관리 계획을 수립할 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-red-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Bell className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">긴급 알림 시스템</h3>
              <p className="text-gray-600 leading-relaxed">
                건강 이상 발생 시 보호자와 담당자에게 즉시 알림이 전송되어 신속한 대응이 가능합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-yellow-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">안전한 데이터 관리</h3>
              <p className="text-gray-600 leading-relaxed">
                개인정보 보호법을 준수하여 민감한 건강 정보를 안전하게 보호하고 관리합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-indigo-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">통합 관리 체계</h3>
              <p className="text-gray-600 leading-relaxed">
                보호자, 보건소 직원, 관계자가 협력하여 효과적인 건강관리 서비스를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Access Section */}
      <section id="access" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">사용자별 접속</h2>
            <p className="text-xl text-gray-600">
              각 사용자 역할에 맞는 맞춤형 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border-2 border-emerald-200 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">보호자</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                어르신의 건강 상태를 실시간으로 확인하고 긴급 상황 시 즉시 알림을 받을 수 있습니다.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">실시간 건강 데이터 조회</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">긴급 알림 수신</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">건강 리포트 확인</span>
                </li>
              </ul>
              <Link to="/admin" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                보호자 로그인
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">보건소 직원</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                전체 경로당의 건강 데이터를 통합 관리하고 효율적인 건강관리 서비스를 제공합니다.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">전체 현황 대시보드</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">건강검진 일정 관리</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">통계 분석 리포트</span>
                </li>
              </ul>
              <Link to="/admin" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                직원 로그인
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">관계자</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                정책 수립을 위한 종합 데이터 분석과 경로당 운영 현황을 파악할 수 있습니다.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">정책 수립 데이터</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">경로당 운영 현황</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">예산 집행 분석</span>
                </li>
              </ul>
              <Link to="/admin" className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                관계자 로그인
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">문의하기</h2>
                <p className="text-emerald-50 mb-8 text-lg">
                  스마트 경로당 헬스케어 시스템에 대해 궁금한 점이 있으시면 언제든지 문의해주세요.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-100">전화 문의</p>
                      <p className="font-medium">055-880-2345</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-100">위치</p>
                      <p className="font-medium">경남 하동군 하동읍 군청로 23</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-100">운영 시간</p>
                      <p className="font-medium">평일 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">빠른 문의</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="010-1234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">문의 내용</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      placeholder="문의 내용을 입력해주세요"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    문의 보내기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-500 p-2 rounded-lg">
                  <Heart className="w-5 h-5 text-white" fill="white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">하동군 스마트 경로당</h3>
                  <p className="text-xs text-gray-400">헬스케어 포털</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                하동군 어르신들의 건강하고 행복한 일상을 위한<br />
                스마트 헬스케어 통합 관리 시스템
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">바로가기</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">소개</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">기능</a></li>
                <li><a href="#access" className="hover:text-white transition-colors">접속하기</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">문의하기</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">고객지원</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">개인정보처리방침</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">이용약관</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400 text-center">
              © 2026 하동군청. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
