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

    const data = [
        {
            id: 0,
            value: allocation.flight_cost,
            label: "Flights"
        },
        {
            id: 1,
            value: allocation.hotel_cost,
            label: "Hotels"
        },
        {
            id: 2,
            value: allocation.food_cost,
            label: "Food"
        },
        {
            id: 3,
            value: allocation.travel_cost,
            label: "Transport"
        },
        {
            id: 4,
            value: allocation.activities_cost,
            label: "Activities"
        },
        {
            id: 5,
            value: allocation.misc_cost,
            label: "Misc"
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
                        ✈ Flights ₹{allocation.flight_cost.toLocaleString()}
                    </Typography>

                    <Typography>
                        🏨 Hotels ₹{allocation.hotel_cost.toLocaleString()}
                    </Typography>

                    <Typography>
                        🍔 Food ₹{allocation.food_cost.toLocaleString()}
                    </Typography>

                    <Typography>
                        🚕 Transport ₹{allocation.travel_cost.toLocaleString()}
                    </Typography>

                    <Typography>
                        🎡 Activities ₹{allocation.activities_cost.toLocaleString()}
                    </Typography>

                    <Typography>
                        📦 Misc ₹{allocation.misc_cost.toLocaleString()}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}

export default BudgetChart;