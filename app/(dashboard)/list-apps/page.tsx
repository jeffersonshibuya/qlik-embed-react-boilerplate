import { getUserApps } from "@/app/_lib/get-user-apps";
import { AppsList } from "@/features/list-apps/components/apps-list";

const ListAppsPage = async () => {
  const apps = await getUserApps();

  return (
    <div>
      <div className="flex flex-1">
        <AppsList apps={apps} />
      </div>
    </div>
  );
};

export default ListAppsPage;
