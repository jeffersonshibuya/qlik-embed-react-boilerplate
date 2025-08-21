import { getUserInfo } from "@/features/auth/actions/user";

export const UserInfo = async () => {
  const userInfo = await getUserInfo();
  return <div>USER: {JSON.stringify(userInfo)}</div>;
};
