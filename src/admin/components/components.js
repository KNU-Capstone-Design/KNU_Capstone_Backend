import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const serverMonitorComponent = componentLoader.add('ServerMonitorDashboard', './ServerMonitorDashboard.jsx');

const infoLogMonitorComponent = componentLoader.add('InfoLog', './InfoLogMonitor.jsx');

const errorLogMonitorComponent = componentLoader.add('errorLog', './ErrorLogMonitor.jsx');

const apiUsageComponent = componentLoader.add('ApiUsage', './ApiUsageMonitor.jsx');

export { componentLoader, serverMonitorComponent, infoLogMonitorComponent, errorLogMonitorComponent, apiUsageComponent };
