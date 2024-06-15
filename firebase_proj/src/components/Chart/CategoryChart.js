import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoryChart = ({ data }) => {
    // Function to format currency as PHP
    const formatCurrencyPHP = (amount) => {
        return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.dataset.label === 'Price') {
                            if (context.parsed.y !== null) {
                                label += formatCurrencyPHP(context.parsed.y);
                            }
                        } else {
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toLocaleString();
                            }
                        }
                        return label;
                    }
                }
            },
            title: {
                display: true,
                text: 'Price and Stock per Category',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value.toLocaleString();
                    }
                }
            }
        }
    };

    return <Bar data={data} options={chartOptions} />;
};

export default CategoryChart;
