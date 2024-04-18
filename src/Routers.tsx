import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="dashboard" element={<Dashboard/>}/>
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default Routers;
