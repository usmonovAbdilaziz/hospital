import { Module } from "@nestjs/common";
import { CryuptoServise } from "src/utils/hashed";

@Module(
    {
        providers:[CryuptoServise],
        exports:[CryuptoServise]
    }
)
export class CryptoModule{}