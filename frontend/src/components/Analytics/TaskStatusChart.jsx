import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function TaskStatusChart({

    todo = 0,

    inProgress = 0,

    completed = 0,

}) {

    const data = {

        labels: [

            "Todo",

            "In Progress",

            "Completed",

        ],

        datasets: [

            {

                data: [

                    todo,

                    inProgress,

                    completed,

                ],

                backgroundColor: [

                    "#3B82F6",

                    "#F59E0B",

                    "#10B981",

                ],

                borderWidth: 2,

            },

        ],

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                position: "bottom",

            },

        },

    };

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-6">

                📊 Task Status

            </h2>

            <Pie
                data={data}
                options={options}
            />

        </div>

    );

}