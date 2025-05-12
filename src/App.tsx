import React from "react";

import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AppContent from "./components/AppContent";

const App: React.FC = () => {
  return (
    <div id="app">
      <Layout className="app-layout">
        <AppHeader />
        <AppContent />
        <AppFooter />
      </Layout>
    </div>
  );
};

export default App;
