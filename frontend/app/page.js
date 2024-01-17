import Header from "./components/header/Header";
import ExpenseTable from "./components/table/ExpenseTable";
import ExpenseReport from "./components/expense-report/ExpenseReport";

export default function Home() {
  return (
    <main className="min-h-screen p-10 text-white bg-[#747074]">
      <div>
        <Header />
      </div>
      <div className="mt-5">
        <h2 className="text-center text-2xl">Track Your Expense</h2>
        <ExpenseTable />
      </div>
      <div className="mt-5">
        <h2 className="text-center text-2xl">Download Expense Report</h2>
        <ExpenseReport />
      </div>
    </main>
  );
}
