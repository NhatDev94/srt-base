import { formatDate, formatDateTime, formatRelativeTime, formatCompactNumber, formatCurrency, formatNumber } from "@nhatdev94/util"

const DemoDate = () => {
    const now = new Date();

    // Danh sách các kịch bản test
    const testCases = [
        { label: "Hiện tại (vừa xong)", value: now },
        { label: "Dữ liệu lỗi (Sai định dạng)", value: "invalid-date-123" },
    ];

    const testCases2 = [
        { label: "Giá sản phẩm thấp", value: 15000 },
        { label: "Giá sản phẩm cao", value: 25000000 },
        { label: "Dữ liệu lỗi (Chuỗi chữ)", value: "abc-123" },
    ];
    return <div className="">
        <h2 className="text-2xl font-semibold pb-2">Kiểm tra Định dạng Ngày tháng</h2>

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

        <h2 className="text-2xl font-semibold pb-2 mt-12">Kiểm tra Định dạng Số & Tiền tệ</h2>

        <div className="grid gap-4">
            {testCases2.map((item, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border hover:bg-muted/40 transition-colors">
                    <p className="text-xs font-bold text-orange-600 uppercase mb-2">
                        Case {index + 1}: {item.label}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Test Tiền tệ */}
                        <div className="bg-background p-3 rounded-md border shadow-sm">
                            <span className="text-[10px] text-muted-foreground block mb-1">formatCurrency</span>
                            <p className="text-lg font-bold text-green-600">
                                {formatCurrency(item.value)}
                            </p>
                        </div>

                        {/* Test Số có phân cách */}
                        <div className="bg-background p-3 rounded-md border shadow-sm">
                            <span className="text-[10px] text-muted-foreground block mb-1">formatNumber</span>
                            <p className="text-lg font-semibold">
                                {formatNumber(item.value)}
                            </p>
                        </div>

                        {/* Test Rút gọn số */}
                        <div className="bg-background p-3 rounded-md border shadow-sm">
                            <span className="text-[10px] text-muted-foreground block mb-1">formatCompactNumber</span>
                            <p className="text-lg font-medium text-blue-500">
                                {/* Chỉ truyền số vào hàm compact */}
                                {typeof item.value === 'number' ? formatCompactNumber(item.value) : 'N/A'}
                            </p>
                        </div>
                    </div>

                    <p className="text-[10px] text-muted-foreground mt-2 italic">
                        Dữ liệu thô từ Backend: <span className="font-mono">{JSON.stringify(item.value)}</span>
                    </p>
                </div>
            ))}
        </div>
    </div>
}

export default DemoDate;    