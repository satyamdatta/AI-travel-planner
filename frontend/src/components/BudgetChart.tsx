import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Paper, Typography } from "@mui/material";

function BudgetChart({ allocation }: any) {

    if (!allocation) {

        return (
            <Paper
                sx={{
                    height: "320px",
                    background: "#111827",
                    borderRadius: 4,
                    p: 2
                }}
            >
                <Typography
                    sx={{
                        color: "white",
                        fontWeight: "bold"
                    }}
                >
                    Budget Allocation
                </Typography>

                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#94a3b8"
                    }}
                >
                    Waiting for budget allocation...
                </Box>
            </Paper>
        )
    }

    const total =
        allocation.flight_cost +
        allocation.hotel_cost +
        allocation.food_cost +
        allocation.travel_cost +
        allocation.activities_cost +
        allocation.misc_cost;

    const getPercent = (value: number) =>
        Math.round((value / total) * 100);

    const data = [
        {
            id: 0,
            value: allocation.flight_cost,
            label: `Flights ${getPercent(allocation.flight_cost)}%`
        },
        {
            id: 1,
            value: allocation.hotel_cost,
            label: `Hotels ${getPercent(allocation.hotel_cost)}%`
        },
        {
            id: 2,
            value: allocation.food_cost,
            label: `Food ${getPercent(allocation.food_cost)}%`
        },
        {
            id: 3,
            value: allocation.travel_cost,
            label: `Transport ${getPercent(allocation.travel_cost)}%`
        },
        {
            id: 4,
            value: allocation.activities_cost,
            label: `Activities ${getPercent(allocation.activities_cost)}%`
        },
        {
            id: 5,
            value: allocation.misc_cost,
            label: `Misc ${getPercent(allocation.misc_cost)}%`
        }
    ];

    return (
        <Paper
            sx={{
                height: "100%",
                background: "#111827",
                color: "white",
                borderRadius: 3,
                p: 2
            }}
        >
            <Typography
                sx={{
                    mb: 1,
                    fontWeight: "bold"
                }}
            >
                Budget Allocation
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "260px"
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <PieChart
                        series={[
                            {
                                data,
                                innerRadius: 45,
                                outerRadius: 80
                            }
                        ]}
                        height={220}
                        hideLegend
                    />
                </Box>

                <Box
                    sx={{
                        width: "170px",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    }}
                >
                    <Typography>
                        ✈ Flights {getPercent(allocation.flight_cost)}%
                    </Typography>

                    <Typography>
                        🏨 Hotels {getPercent(allocation.hotel_cost)}%
                    </Typography>

                    <Typography>
                        🍔 Food {getPercent(allocation.food_cost)}%
                    </Typography>

                    <Typography>
                        🚕 Transport {getPercent(allocation.travel_cost)}%
                    </Typography>

                    <Typography>
                        🎡 Activities {getPercent(allocation.activities_cost)}%
                    </Typography>

                    <Typography>
                        📦 Misc {getPercent(allocation.misc_cost)}%
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}

export default BudgetChart;
