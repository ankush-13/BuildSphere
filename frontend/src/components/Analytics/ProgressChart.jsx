import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function ProgressChart({

    completed = 0,
    total = 0,

}) {

    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    const data = {

        labels: [

            "Progress",

        ],

        datasets: [

            {
                label: "Completed %",
                data: [percentage],
                borderColor: "#2563EB",
                backgroundColor: "rgba(37,99,235,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 6,
            },

        ],

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                display: false,

            },

        },

        scales: {

            y: {

                beginAtZero: true,
                max: 100,

            },

        },

    };

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-4">

                📈 Project Progress

            </h2>

            <Line
                data={data}
                options={options}
            />

            <div className="mt-5">

                <div className="flex justify-between text-sm font-medium">

                    <span>Overall Progress</span>

                    <span>{percentage}%</span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">

                    <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{
                            width: `${percentage}%`,
                        }}
                    />

                </div>

            </div>

        </div>

    );

}