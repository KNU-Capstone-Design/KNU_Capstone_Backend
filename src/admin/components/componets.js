import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const serverMonitorComponent = componentLoader.add('ServerMonitorDashboard', './ServerMonitorDashboard.jsx');

export { componentLoader, serverMonitorComponent };
