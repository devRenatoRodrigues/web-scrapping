import LinkedInService from "../services/Linkedin.service";

describe('LinkedIn Test', () => {
    jest.setTimeout(300000)

    beforeAll(async () => {
        //you code here
    });

    it('should login', async () => {
        const service = new LinkedInService();
        await service.findJobs();
    })

    afterAll(async () => {
        //you code here
    });

});