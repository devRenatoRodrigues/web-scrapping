import { ILinkedInJob } from "../interfaces";
import { JobsService } from "../services/Jobs.service";
import { Request, Response } from "express";

export class JobsController {
    private _service: JobsService;
    constructor() {
        this._service = new JobsService();
    }
    async createJobs(_req: Request, res: Response) {
        try {
            const response = await this._service.createJobs();
            return res.status(201).json(response);
        }
        catch (error: any) {
            throw new Error(`Error on Create Jobs: ${error.message}`);
        }
    }
    async getJobs(req: Request, res: Response) {
        try {
            const response = await this._service.getJobs();
            return res.status(200).json(response);
        }
        catch (error: any) {
            throw new Error(`Error on Get Jobs: ${error.message}`);
        }
    }
}