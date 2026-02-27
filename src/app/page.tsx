import DashBoardForm from "@/features/dashboard/components/DashBoardForm";
import DashBoardTable from "@/features/dashboard/components/DashBoardTable";
import Demo from "@/features/dashboard/components/Demo";
import DemoDate from "@/features/dashboard/components/DemoDate";
import DialogCreate from "@/features/dashboard/components/DialogCreate";

const DashBoardPage = () => {
    return (
        <div className="">
            <div className="w-full h-fit sm:flex sm:gap-4 mb-8">
                <div className="w-full sm:w-80 h-fit rounded-lg border border-border p-4 mb-4 sm:mb-0">
                    {/* <h4 className="text-base font-semibold text-foreground"></h4> */}
                    <DashBoardForm />
                </div>
                <div className="w-full sm:w-80 h-fit rounded-lg border border-border p-4">
                    <Demo />
                </div>
            </div>

            <div className="w-full h-fit rounded-lg border border-border p-4">
                <DemoDate />
            </div>

            <div className="w-full h-fit rounded-lg border border-border p-4">
                <div className="w-full flex items-center justify-end mb-4"><DialogCreate /></div>
                <DashBoardTable />
            </div>
        </div>
    )
}

export default DashBoardPage;   