import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

describe('Cats', () => {
  jest.setTimeout(60000);
  let app: INestApplication;
  let controller = "/knights";

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`GET Route - ${controller}/get`, () => {
    const route = `${controller}/get`;
    
    it("should get success on listing knights", async() => {
      const response = await request(app.getHttpServer())
      .get(route);
      
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.messages[0].success).toBe(true);
      expect(response.body).toMatchObject({
        messages: expect.any(Array),
        data: expect.objectContaining({
          pagination: expect.any(Object),
          result: expect.any(Array),
        }),
      });
      
    });

    it("should get success on listing paginated knights", async() => {
      const limit = "7";
      const page = "1"
      
      const response = await request(app.getHttpServer()).get(route + `?limit=${limit}&page=${page}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.limit).toBe(limit);
      expect(response.body.data.pagination.page).toBe(page);
      
      expect(response.body.data.pagination).toMatchObject({
        page: expect.any(String),
        limit: expect.any(String),
        count: expect.any(Number),
        totalCount: expect.any(Number),
        totalPages: expect.any(Number),
        populate: expect.any(Array),
        filterObj: expect.any(Object),
      })
      expect(response.body.messages[0].success).toBe(true);


    });

    it("should fail with invalid query params", async() => {
      const response = await request(app.getHttpServer()).get(route + `?test=value`);
      
      expect(response.status).toBe(200);
      expect(response.body.messages[0].success).toBe(false);
      
    });

    it("should get success on getting just one item", async () => {
      const response = await request(app.getHttpServer()).get(route);
      
      const target = response.body.data.result[0]._id;
      expect(target).toBeDefined();
      expect(typeof target).toBe("string");
      
      const found = await request(app.getHttpServer()).get(route + "/" + target);
      expect(found.body).toBeDefined();
      expect(found.body._id).toBeDefined();
      expect(found.body._id).toBe(target);
      expect(response.status).toBe(200);
      expect(response.body.messages[0].success).toBe(true);
    });
  });
});