export default function AIInsights({
    dashboard,
}) {

    const insights = [];

    if (dashboard?.myProjects > 0) {
        insights.push(
            `🚀 You are managing ${dashboard.myProjects} project${dashboard.myProjects > 1 ? "s" : ""}.`
        );
    }

    if (dashboard?.joinedProjects > 0) {
        insights.push(
            `🤝 You're collaborating in ${dashboard.joinedProjects} joined project${dashboard.joinedProjects > 1 ? "s" : ""}.`
        );
    }

    if (dashboard?.pendingJoinRequests > 0) {
        insights.push(
            `⏳ ${dashboard.pendingJoinRequests} join request${dashboard.pendingJoinRequests > 1 ? "s are" : " is"} waiting for approval.`
        );
    }

    if (dashboard?.totalProjects > 5) {
        insights.push(
            "📈 Your workspace is growing rapidly."
        );
    }

    if (insights.length === 0) {
        insights.push(
            "✨ Create your first project to start collaborating."
        );
    }

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex items-center gap-3 mb-5">

                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl">

                    🤖

                </div>

                <div>

                    <h2 className="text-xl font-bold">

                        AI Insights

                    </h2>

                    <p className="text-gray-500 text-sm">

                        Smart recommendations based on your workspace

                    </p>

                </div>

            </div>

            <div className="space-y-3">

                {insights.map((item, index) => (

                    <div
                        key={index}
                        className="flex items-start gap-3 bg-blue-50 rounded-xl p-3"
                    >

                        <span className="text-lg">

                            ✔️

                        </span>

                        <p className="text-gray-700">

                            {item}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}