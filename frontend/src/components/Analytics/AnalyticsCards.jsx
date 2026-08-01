export default function AnalyticsCards({

    totalProjects = 0,

    totalTasks = 0,

    completedTasks = 0,

    totalMembers = 0,

}) {

    const cards = [

        {
            title: "Projects",
            value: totalProjects,
            icon: "📁",
            color: "bg-blue-500",
        },

        {
            title: "Tasks",
            value: totalTasks,
            icon: "📋",
            color: "bg-yellow-500",
        },

        {
            title: "Completed",
            value: completedTasks,
            icon: "✅",
            color: "bg-green-500",
        },

        {
            title: "Members",
            value: totalMembers,
            icon: "👥",
            color: "bg-purple-500",
        },

    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500 text-sm">

                                {card.title}

                            </p>

                            <h2 className="text-3xl font-bold mt-2">

                                {card.value}

                            </h2>

                        </div>

                        <div
                            className={`${card.color} w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white`}
                        >

                            {card.icon}

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}