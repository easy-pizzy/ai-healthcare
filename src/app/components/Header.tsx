import { Heart, Menu, Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">하동군 스마트 경로당</h1>
              <p className="text-xs text-gray-500">헬스케어 통합 관리 시스템</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#dashboard" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              대시보드
            </a>
            <a href="#seniors" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              어르신 관리
            </a>
            <a href="#centers" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              경로당 현황
            </a>
            <a href="#reports" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              건강 리포트
            </a>
            <a href="#notices" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              공지사항
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">관리자</p>
                <p className="text-xs text-gray-500">하동군 보건소</p>
              </div>
            </div>
            <button className="md:hidden p-2 text-gray-400 hover:text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
