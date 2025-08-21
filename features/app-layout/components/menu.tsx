import Link from "next/link";

export const MenuNavigation = () => {
  return (
    <ul>
      <li>
        <Link href={"/"}>Dashboard</Link>{" "}
      </li>
      <li>
        <Link href={"/charts"}>Charts</Link>
      </li>
    </ul>
  );
};
