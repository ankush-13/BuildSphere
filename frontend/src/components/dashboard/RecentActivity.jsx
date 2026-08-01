export default function RecentActivity({ dashboard }) {

    const activities = [

        {
            icon: "📁",
            title: "Created new project",
            desc: "Start collaborating with your team.",
        },

        {
            icon: "🤝",
            title: `${dashboard?.joinedProjects || 0} Joined Projects`,
            desc: "Projects where you're a member.",
        },

        {
            icon: "📨",
            title: `${dashboard?.pendingJoinRequests || 0} Pending Requests`,
            desc: "Awaiting approval.",
        },

        {
            icon: "🚀",
            title: `${dashboard?.totalProjects || 0} Total Projects`,
            desc: "Projects available in BuildSphere.",
        },

    ];

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-5">

                📝 Recent Activity

            </h2>

            <div className="space-y-4">

                {activities.map((activity, index) => (

                    <div
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b last:border-none"
                    >

                        <div className="text-2xl">

                            {activity.icon}

                        </div>

                        <div>

                            <h3 className="font-semibold">

                                {activity.title}

                            </h3>

                            <p className="text-gray-500 text-sm">

                                {activity.desc}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}