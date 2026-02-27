import { formatDate, formatDateTime, formatRelativeTime } from "@/lib/date"
import { subDays, subHours, subMinutes, subMonths, subYears } from "date-fns";

const DemoDate = () => {
    const now = new Date();

    // Danh sách các kịch bản test
    const testCases = [
        { label: "Hiện tại (vừa xong)", value: now },
        { label: "Dữ liệu lỗi (Sai định dạng)", value: "invalid-date-123" },
    ];
    return <div className="p-6 max-w-3xl mx-auto bg-card border rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Kiểm tra Định dạng Ngày tháng</h2>

        <div className="space-y-4">
            {testCases.map((item, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg border border-border">
                    <p className="text-sm font-medium text-blue-500 mb-1">
                        {index + 1}. {item.label}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                        <div className="bg-background p-2 rounded border">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold">formatRelativeTime</p>
                            <p className="text-sm font-semibold text-foreground">
                                {formatRelativeTime(item.value)}
                            </p>
                        </div>

                        <div className="bg-background p-2 rounded border">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold">formatDate</p>
                            <p className="text-sm font-semibold text-foreground">
                                {formatDate(item.value)}
                            </p>
                        </div>

                        <div className="bg-background p-2 rounded border">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold">formatDateTime</p>
                            <p className="text-sm font-semibold text-foreground">
                                {formatDateTime(item.value)}
                            </p>
                        </div>
                    </div>

                    <p className="text-[10px] text-muted-foreground mt-2 italic">
                        Dữ liệu gốc: {String(item.value)}
                    </p>
                </div>
            ))}
        </div>
    </div>
}

export default DemoDate;    