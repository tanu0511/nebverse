import React, { useEffect, useState } from "react";
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import { Project as ImportedProject } from './ProjectsContext';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";

// Extend or define Project interface to ensure it has an id property
interface Project extends ImportedProject {
  id: number;
}

interface OverviewTabProps {
  project: Project;
  id: number; 
}

const fetchTaskStats = async (projectId: number) => {
  void projectId;
  return {
    completed: 7,
    total: 10,
  };
};

const fetchHoursLogged = async (projectId: number) => {
  void projectId;
  return {
    planned: [2, 3, 4, 3, 5, 4, 2],
    actual: [1, 2, 3, 2, 4, 3, 1],
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  };
};

const fetchProjectBudget = async (projectId: number) => {
  // TODO: Replace with real API call
  void projectId;
  return {
    planned: [1000, 1200, 900, 1100, 1300, 1000, 950],
    actual: [900, 1100, 950, 1000, 1200, 900, 900],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  };
};

const OverviewTab: React.FC<OverviewTabProps> = ({ project }) => {
  const [taskStats, setTaskStats] = useState<{ completed: number; total: number }>({ completed: 0, total: 0 });
  const [hoursData, setHoursData] = useState<{ planned: number[]; actual: number[]; categories: string[] }>({ planned: [], actual: [], categories: [] });
  const [budgetData, setBudgetData] = useState<{ planned: number[]; actual: number[]; categories: string[] }>({ planned: [], actual: [], categories: [] });

  useEffect(() => {
    // Simulate fetching from backend
    fetchTaskStats(project.id).then(setTaskStats);
    fetchHoursLogged(project.id).then(setHoursData);
    fetchProjectBudget(project.id).then(setBudgetData);
  }, [project.id]);

  const percent = taskStats.total ? Math.round((taskStats.completed / taskStats.total) * 100) : 0;

  const series = [percent];
  const options = {
    chart: {
      type: 'radialBar' as const,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        track: {
          background: "rgba(250,204,21,0.2)",
        },
        dataLabels: {
          name: { show: false },
          value: {
            show: true,
            fontSize: "22px",
            color: "#222",
            offsetY: 8,
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "radial",
        shadeIntensity: 0.4,
        gradientToColors: ["#22c55e"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
      colors: ["#facc15"],
    },
    labels: ["Progress"],
  };

  const hoursSeries = [
    { name: "Planned", data: hoursData.planned },
    { name: "Actual", data: hoursData.actual },
  ];
  const hoursOptions: ApexOptions = {
    chart: { type: "bar", stacked: false },
    plotOptions: { bar: { horizontal: false, borderRadius: 4, columnWidth: "40%" } },
    dataLabels: { enabled: false },
    xaxis: { categories: hoursData.categories },
    colors: ["#0074B7", "#BFD7ED"],
    legend: { position: "top" },
  } as const;

  const budgetSeries = [
    { name: "Planned", data: budgetData.planned },
    { name: "Actual", data: budgetData.actual },
  ];
  const budgetOptions: ApexOptions = {
    chart: { type: "bar", stacked: false },
    plotOptions: { bar: { horizontal: false, borderRadius: 4, columnWidth: "40%" } },
    dataLabels: { enabled: false },
    xaxis: { categories: budgetData.categories },
    colors: ["#0074B7", "#BFD7ED"],
    legend: { position: "top" },
  };


  return (
    <div className="row g-3 d-flex align-items-stretch">
      {/* Progress & Client */}
      <div className="col-lg-8 d-flex flex-column">
        <Card className="h-100">
          <CardBody>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold mb-2">Project Progress</div>
                <div>{percent}% Progress</div>
              </div>
              <div>
                <div className="fw-bold">Start Date</div>
                <div>{project.startDate || '-'}</div>
              </div>
              <div>
                <div className="fw-bold">Deadline</div>
                <div>{project.deadline || '-'}</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="col-lg-4 d-flex flex-column">
        <Card className="h-100">
          <CardBody className="text-center d-flex flex-column align-items-center justify-content-center h-100">
            <Icon icon="Person" size="2x" />
            <div className="mt-2 text-muted">- No client assigned to the project. -</div>
          </CardBody>
        </Card>
      </div>
      {/* Tasks Chart & Statistics */}
      <div className="col-lg-8 d-flex flex-column">
        <Card className="h-100">
          <CardBody>
            <div className="fw-bold mb-2">Tasks</div>
            <div className="d-flex justify-content-center align-items-center" style={{ height: 200 }}>
              <ReactApexChart
                options={options}
                series={series}
                type="radialBar"
                height={180}
                width={180}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="col-lg-4 d-flex flex-column">
        <Card className="h-100">
          <CardBody>
            <div className="fw-bold mb-2">Statistics</div>
            <div className="row g-2">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                  <span>Project Budget</span>
                  <span className="fw-bold">0</span>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                  <span>Hours Logged</span>
                  <span className="fw-bold">0Hour(s) 0Minute(s)</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                  <span>Earnings</span>
                  <span className="fw-bold text-primary">₹0.00</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                  <span>Expenses</span>
                  <span className="fw-bold text-primary">₹0.00</span>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center border rounded p-2">
                  <span>Profit</span>
                  <span className="fw-bold text-primary">₹0.00</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      {/* Hours Logged & Project Budget Charts */}
      <div className="col-lg-6">
        <Card>
          <CardBody>
            <div className="fw-bold mb-2">Hours Logged</div>
            <div style={{ width: '100%', minHeight: 220 }}>
              <ReactApexChart
                options={hoursOptions}
                series={hoursSeries}
                type="bar"
                height={220}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="col-lg-6">
        <Card>
          <CardBody>
            <div className="fw-bold mb-2">Project Budget</div>
            <div style={{ width: '100%', minHeight: 220 }}>
              <ReactApexChart
                options={budgetOptions}
                series={budgetSeries}
                type="bar"
                height={220}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      {/* Project Details */}
      <div className="col-12">
        <Card>
          <CardBody>
            <div className="fw-bold mb-2">Project Details</div>
            {/* Add more details as needed */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;