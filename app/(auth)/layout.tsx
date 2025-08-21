export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-slate-200">
      <div className="flex w-[450px] h-[450px] bg-white justify-center items-center border rounded-lg border-slate-300 shadow-lg">
        {children}
      </div>
    </div>
  );
}
