import express from "express";

import sequelize from "./shared/connection";
import contractRoutes from "./routes/contract-routes";
import depositRoutes from "./routes/deposit-routes";
import jobRoutes from "./routes/job-routes";
import paymentRoutes from "./routes/payment-routes";
import profileRoutes from "./routes/profile-routes";

import Contract from "./models/contract-model";
import Deposit from "./models/deposit-model";
import Job from "./models/job-model";
import Payment from "./models/payment-model";
import Profile from "./models/profile-model";

const app = express();
app.use(express.json());
const PORT = 3000;

Profile.initModel(sequelize);
Contract.initModel(sequelize);
Deposit.initModel(sequelize);
Job.initModel(sequelize);
Payment.initModel(sequelize);

app.get("/", (req, res) => {
    res.status(200).send({ message: "Nodejs" });
});

app.use("/", contractRoutes);
app.use("/", depositRoutes);
app.use("/", jobRoutes);
app.use("/", paymentRoutes);
app.use("/", profileRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("db connected sucessfully");

        await sequelize.sync({});
        console.log("model sync with the db")

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("unable to connect to the database: ", error)
    }
})();

export default app;