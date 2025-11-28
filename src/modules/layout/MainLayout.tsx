import { NavLink } from 'react-router';

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-dvh w-full bg-gray-100 font-sans text-gray-900">
      {/* Navigation Header */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-slate-800 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Apps</h1>
          <nav className="flex gap-6">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'font-bold text-blue-400' : 'hover:text-blue-300')} end>
              Stopwatch
            </NavLink>
            <NavLink to="/weather" className={({ isActive }) => (isActive ? 'font-bold text-blue-400' : 'hover:text-blue-300')}>
              Weather
            </NavLink>
            <NavLink to="/planner" className={({ isActive }) => (isActive ? 'font-bold text-blue-400' : 'hover:text-blue-300')}>
              Planner
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container mx-auto overflow-auto px-4 py-8 pt-20">{children}</main>
    </div>
  );
};

export default MainLayout;
