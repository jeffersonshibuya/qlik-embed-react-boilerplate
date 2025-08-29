"use client";

interface UserItemInfoProps {
  title: string;
  value: React.ReactNode;
}

export const UserItemInfo = ({ title, value }: UserItemInfoProps) => {
  return (
    <dl>
      <div className="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm/6 font-semibold text-gray-800 capitalize">
          {title}
        </dt>
        <dd className="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">
          {value}
        </dd>
      </div>
    </dl>
  );
};
