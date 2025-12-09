import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast";
import GlobalStyles from './styles/GlobalStyles'
import Dashboard from "./pages/Dashboard"
import Guests from "./pages/Guests";
import Bookings from "./pages/Bookings"
import Cabins from "./pages/Cabins"
import Users from "./pages/Users"
import Settings from "./pages/Settings"
import Account from "./pages/Account"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking"
import Checkin from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import { OpenSidebarProvider } from "./context/OpenSidebarContext";
import NewBooking from "./pages/NewBooking";
import { Home, Layout, Room, ProductDetails, Hero, BookTheRoom } from "../src/client/router"

const managerPaths = ['/login', '/reservation', '/dashboard', '/guests', '/bookings', '/cabins', '/users', '/settings', '/account'];


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      scaleTime: 0,
    },
  },
});

function App() {
  return (
    <OpenSidebarProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>

          {managerPaths.some(path => location.pathname.startsWith(path)) && <GlobalStyles />}

          <BrowserRouter>

            <Routes>
              < Route element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>} >
                {/*<Route index element={<Navigate replace
                  to="dashboard" />} />*/}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="guests" element={<Guests />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/new" element={<NewBooking />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
                <Route path="bookings/new/:cabinId" element={<NewBooking />} />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />

              {/**client side */}
              <Route
                path='Bookins'
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />

              <Route
                path='/rooms'
                element={
                  <Layout>
                    <Hero isHomePage={false} />
                    <Room />
                  </Layout>
                }
              />

              <Route
                path='/room-details/:roomId'
                element={
                  <Layout>
                    <ProductDetails />
                  </Layout>
                }
              />
              <Route
                path='/reservation/new/:roomId'
                element={
                  <Layout>
                    <div style={{ marginTop: '100px' }}>
                      <BookTheRoom />
                    </div>

                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>

          <Toaster position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: '16px',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: 'var(--color-grey-0)',
                color: 'var(--color-grey-700)',
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </OpenSidebarProvider>
  )
}
export default App;