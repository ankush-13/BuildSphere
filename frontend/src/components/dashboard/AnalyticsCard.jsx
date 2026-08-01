export default function AnalyticsCard({
    title,
    value,
    subtitle,
    icon,
    color = "bg-blue-600",
}) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-500 text-sm font-medium">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="text-xs text-gray-400 mt-2">
                            {subtitle}
                        </p>
                    )}

                </div>

                <div
                    className={`w-14 h-14 rounded-xl ${color} text-white flex items-center justify-center text-2xl shadow-lg`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}