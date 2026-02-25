import DashBoardTable from "@/features/dashboard/components/DashBoardTable";
import DialogCreate from "@/features/dashboard/components/DialogCreate";

const DashBoardPage = () => {
    return (
        <div className="">
            <div className="w-full h-fit rounded-lg border border-gray-200 p-4">
                <h4 className="w-fit text-base font-semibold mb-4">Dashboard</h4>
                <div className="w-full flex items-center justify-end mb-4"><DialogCreate /></div>
                <DashBoardTable />
            </div>
        </div>
    )
}

export default DashBoardPage;   