import CountCard from "@/components/CountCard";
import { cookies } from "next/headers";

export async function getDashboardData() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const endPoint = `${process.env.domain}/api/dashboard`;
    const response = await fetch(endPoint, {
      cache: "no-cache",
      headers: {
        Cookie: `token=${token}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const dashboardData = await getDashboardData();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-600">
        Welcome to TaskManager
      </h1>
      <div className="grid grid-cols-4 mt-5 gap-10">
        <CountCard
          title="All Tasks"
          count={dashboardData.totalTasks}
          color="text-red-600"
          path="/tasks"
        />
        <CountCard
          title="Open Tasks"
          count={dashboardData.openTasks}
          color="text-yellow-600"
          path="/tasks"
          queryParams={{ status: "Open" }}
        />
        <CountCard
          title="In-Progress Tasks"
          count={dashboardData.inProgressTasks}
          color="text-blue-600"
          path="/tasks"
          queryParams={{ status: "In Progress" }}
        />
        <CountCard
          title="Completed Tasks"
          count={dashboardData.completedTasks}
          color="text-indigo-600"
          path="/tasks"
          queryParams={{ status: "Done" }}
        />
        <CountCard
          title="High Priority Tasks"
          count={dashboardData.highPriority}
          color="text-pink-600"
          path="/tasks"
          queryParams={{ priority: "High" }}
        />
        <CountCard
          title="Medium Priority Tasks"
          count={dashboardData.mediumPriority}
          color="text-green-600"
          path="/tasks"
          queryParams={{ priority: "Medium" }}
        />
        <CountCard
          title="Low Priority Tasks"
          count={dashboardData.lowPriority}
          color="text-purple-600"
          path="/tasks"
          queryParams={{ priority: "Low" }}
        />
      </div>
    </div>
  );
}
