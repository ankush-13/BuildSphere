export default function ProgressCard({
    completed = 0,
    total = 0,
}) {

    const percentage =
        total > 0
            ? Math.round((completed / total) * 100)
            : 0;

    const getStatus = () => {

        if (percentage >= 80)
            return {
                text: "Excellent 🚀",
                color: "text-green-600",
            };

        if (percentage >= 50)
            return {
                text: "Good 👍",
                color: "text-yellow-500",
            };

        return {
            text: "Needs Improvement",
            color: "text-red-500",
        };

    };

    const status = getStatus();

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-bold">

                    📈 Workspace Progress

                </h2>

                <span className="text-2xl font-bold text-blue-600">

                    {percentage}%

                </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

                <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-700"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

            <div className="mt-5 flex justify-between text-sm text-gray-600">

                <span>

                    Completed

                    <strong className="ml-1">

                        {completed}

                    </strong>

                </span>

                <span>

                    Total

                    <strong className="ml-1">

                        {total}

                    </strong>

                </span>

            </div>

            <div className={`mt-4 font-semibold ${status.color}`}>

                {status.text}

            </div>

        </div>

    );

}