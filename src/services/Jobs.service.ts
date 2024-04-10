import { PrismaClient } from "@prisma/client";
import { ILinkedInJob } from "../interfaces";
import prisma from "../prisma/prisma.client";
import LinkedInService from "./Linkedin.service";


export class JobsService {
    private _prisma = new PrismaClient();

    public async createJobs(): Promise<ILinkedInJob[]> {
        const linkedinService = new LinkedInService();
        const jobs = await linkedinService.findJobs();
        console.log(jobs)
        await this._prisma.job.createMany({
            data: jobs
        })
        return jobs
    }

    public async getJobs(): Promise<ILinkedInJob[]> {
        return prisma.job.findMany();
    }

}