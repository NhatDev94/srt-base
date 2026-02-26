import { InputPhone } from "@/components/common/InputPhone";
import { Input } from "@/components/ui/input";
import DashBoardForm from "@/features/dashboard/components/DashBoardForm";
import DashBoardTable from "@/features/dashboard/components/DashBoardTable";
import DialogCreate from "@/features/dashboard/components/DialogCreate";

const DashBoardPage = () => {
    return (
        <div className="">
            <div className="w-full h-fit flex gap-4 mb-8">
                <div className="w-full sm:w-60 h-fit rounded-lg border border-border p-4">
                    {/* <h4 className="text-base font-semibold text-foreground"></h4> */}
                    <DashBoardForm />
                </div>
            </div>

            <div className="w-full h-fit rounded-lg border border-border p-4">
                <div className="w-full flex items-center justify-end mb-4"><DialogCreate /></div>
                <DashBoardTable />
            </div>
        </div>
    )
}

export default DashBoardPage;   