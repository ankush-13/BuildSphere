export default function StatsCard({
    title,
    value,
    icon,
    color = "bg-blue-500",
}) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm font-medium">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {value}
                    </h2>

                </div>

                <div
                    className={`${color} text-white p-4 rounded-xl text-3xl`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}