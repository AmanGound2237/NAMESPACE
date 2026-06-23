import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'

const AppLayout = () => {
  return (
    <div className="min-h-screen text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="px-6 pb-14 pt-8 md:px-10">
            <div className="mx-auto w-full max-w-6xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
