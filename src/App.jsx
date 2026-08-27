import { useState } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import NotAuthorized from './components/NotAuthorized'
import Login from './components/auth/Login'
import ProtectedRoute from './context/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import PorterLayout from './components/potter/PotterLayout'
import { AuthProvider } from './context/AuthContext'
import PotterDashboard from './components/potter/PotterDashboard'
import CollectMilk from './components/potter/CollectMilk'
import MyCollections from './components/potter/MyCollections'
import AssignedFarmers from './components/potter/AssignedFarmers'
import Notices from './components/potter/Notices'

import FarmerLayout from './components/farmer/FarmerLayout'
import FarmerProfile from './components/farmer/FarmerProfile'
import MyProfile from './components/potter/MyProfile'
import FarmerNotices from './components/farmer/FarmerNotices'
import FarmerMilk from './components/farmer/FarmerMilk'
import FarmerDashboard from './components/farmer/FarmerDashboard'
import FarmerFeedback from './components/farmer/FarmerFeedback'
import AdminDashboard from './components/admin/AdminDashboard'
import ListPorters from './components/admin/ListPorters'
import AddPorter from './components/admin/AddPorter'
import ListFarmers from './components/admin/ListFarmers'
import AddFarmer from './components/admin/AddFarmer'
import Collections from './components/admin/Collections'
import FarmerBalances from './components/admin/FarmerBalances'
import PayFarmer from './components/admin/PayFarmer'
import NoticesAdmin from './components/admin/NoticesAdmin'
import { ToastContainer } from 'react-toastify'
import EditPorter from './components/admin/EditPorter'
import EditFarmer from './components/admin/EditFarmer'
import CattleAi from './components/farmer/CattleAi'


function App() {

  return (
    <Router>
      <AuthProvider>
        <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />

      <Routes>

        <Route path="/admin-dashboard"
          element={
              <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout />
              </ProtectedRoute>
          }>
            <Route  path='' element={<AdminDashboard/>}/>
            <Route  path='porters' element={<ListPorters/>}/> 
            <Route  path='porters/add' element={<AddPorter/>}/> 
            <Route  path='porters/edit/:id' element={<EditPorter/>}/> 
            <Route  path='farmers' element={<ListFarmers/>}/>
            <Route  path='farmers/add' element={<AddFarmer/>}/>
            <Route  path='farmers/edit/:id' element={<EditFarmer/>}/> 

            <Route  path="collections" element={<Collections />} />
            <Route  path="balances" element={<FarmerBalances />} />
            <Route  path="balances/pay-farmer"  element={<PayFarmer />} />
            <Route  path="notices" element={<NoticesAdmin />} />
          </Route>

        <Route path="/farmer-dashboard"
          element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                  <FarmerLayout />
              </ProtectedRoute>
          }>
            <Route  path='' element={<FarmerDashboard/>}/>
            <Route  path='profile' element={<FarmerProfile/>}/>
            <Route  path='notices' element={<FarmerNotices/>}/>
            <Route  path='collections' element={<FarmerMilk/>}/>
            <Route  path='feedback' element={<FarmerFeedback/>}/>
            <Route path="cattle-ai" element={<CattleAi />} />

          </Route>

        <Route path="/porter-dashboard"
          element={
              <ProtectedRoute allowedRoles={["porter"]}>
                <PorterLayout/>
              </ProtectedRoute>
          }>
              <Route  path='' element={<PotterDashboard/>}/>  
              <Route  path='porter/collect-milk' element={<CollectMilk/>}/> 
              <Route  path='porter/collections' element={<MyCollections/>}/>
              <Route  path='porter/farmers' element={<AssignedFarmers/>}/>
              <Route  path='porter/notices' element={<Notices/>}/>
              <Route  path='porter/profile' element={<MyProfile/>}/>
          </Route> 


        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/not-authorized' element={<NotAuthorized/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    
      </AuthProvider>
    </Router>
  )
}

export default App
