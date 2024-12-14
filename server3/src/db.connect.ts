import mongoose from "mongoose";
import { Logger } from "borgen";
import { config } from "./config/config";

mongoose.set("strictQuery", true);


const connectDb = (StartServer: () => void) => {
    mongoose
        .connect(config.mongo.URL)
    .then(() => {
        Logger.info({ message: "MongoDB Connected" });

        StartServer();
    })
    .catch((error) => {
        Logger.error({ message: error });
    });
}

export default connectDb
