import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100 flex flex-col">
      <Navbar />
      <main className="bg-slate-100 flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
