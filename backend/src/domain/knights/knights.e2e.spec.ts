import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { Faker, faker } from '@faker-js/faker';
import { log } from 'console';

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
    
    it("should success on listing knights", async() => {
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

    it("should success on listing paginated knights", async() => {
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

    it("should success on getting just one item", async () => {
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

  describe(`POST Route - ${controller}/create`, () => {
    const route = `${controller}/create`;
    const name = faker.person.firstName();

    it("should success on creating a knight", async () => {
      const obj = {
        attributes:{ strength: "20", dexterity: "20", constitution: "20", intelligence: "20", wisdom: "20", charisma: "20" },
        birthday: "1902/4/22",
        equipped:{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },
        keyAttribute:"strength",
        name: name,
        nickname:faker.person.middleName(),
        weapons:[{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },]
      }
      const response = await request(app.getHttpServer()).post(route).send(obj);;
      
      expect(response.status).toBe(201);
      expect(response.body.messages[0].success).toBe(true);
      expect(response.body.data.name).toBe(name);

    });

    it("Should fail on create without name", async()=> {
      const obj = {
        attributes:{ strength: "20", dexterity: "20", constitution: "20", intelligence: "20", wisdom: "20", charisma: "20" },
        birthday: "1902/4/22",
        equipped:{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },
        keyAttribute:"strength",
        nickname:faker.person.middleName(),
        weapons:[{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },]
      }
      const response = await request(app.getHttpServer()).post(route).send(obj);;
      
      expect(response.status).toBe(400);
    })

    it("Should fail on create with duplicate name", async()=> {
      const obj = {
        name: name,
        attributes:{ strength: "20", dexterity: "20", constitution: "20", intelligence: "20", wisdom: "20", charisma: "20" },
        birthday: "1902/4/22",
        equipped:{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },
        keyAttribute:"strength",
        nickname:faker.person.middleName(),
        weapons:[{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },]
      }
      const response = await request(app.getHttpServer()).post(route).send(obj);
      expect(response.body.messages[0].success).toBe(false);      
    })

    it("Should fail on create with too long name", async()=> {
      const obj = {
        name: "too long naaaaaaaaaaaaaaaaaame",
        attributes:{ strength: "20", dexterity: "20", constitution: "20", intelligence: "20", wisdom: "20", charisma: "20" },
        birthday: "1902/4/22",
        equipped:{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },
        keyAttribute:"strength",
        nickname:faker.person.middleName(),
        weapons:[{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },]
      }
      const response = await request(app.getHttpServer()).post(route).send(obj);
      expect(response.body.messages[0].success).toBe(false);      
    })

    it("Should fail on create with invalid weapon id", async()=> {
      const obj = {
        name: faker.person.firstName(),
        attributes:{ strength: "20", dexterity: "20", constitution: "20", intelligence: "20", wisdom: "20", charisma: "20" },
        birthday: "1902/4/22",
        equipped:{ _id: "65eda8f5c818c5599ea8bc2d", name: "testeee6", keyAttribute: "strength", mod: 3 },
        keyAttribute:"strength",
        nickname:faker.person.middleName(),
        weapons:[{ _id: "65eda8f5c818c5599ea8bc2d", name: "testeee6", keyAttribute: "strength", mod: 3 },]
      }
      const response = await request(app.getHttpServer()).post(route).send(obj);
      expect(response.body.messages[0].success).toBe(false);      
    })

    it("Should fail on create with invalid attribute", async()=> {
      const obj = {
        name: faker.person.firstName(),
        attributes:{ strength: "21", dexterity: "20", constitution: "20", intelligence: "20", wisdom: "20", charisma: "20" },
        birthday: "1902/4/22",
        equipped:{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },
        keyAttribute:"strength",
        nickname:faker.person.middleName(),
        weapons:[{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },]
      }
      const response = await request(app.getHttpServer()).post(route).send(obj);
      expect(response.body.messages[0].success).toBe(false);      
    })

    it("Should fail on create with invalid birthday", async()=> {
      const obj = {
        name: faker.person.firstName(),
        attributes:{ strength: "20", dexterity: "20", constitution: "20", intelligence: "20", wisdom: "20", charisma: "20" },
        birthday: "2023/4/22",
        equipped:{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },
        keyAttribute:"strength",
        nickname:faker.person.middleName(),
        weapons:[{ _id: "65eda8f5c818c5599ea8bc2f", name: "testeee6", keyAttribute: "strength", mod: 3 },]
      }
      const response = await request(app.getHttpServer()).post(route).send(obj);
      expect(response.body.messages[0].success).toBe(false);      
    })

  });

  describe(`Delete Route - ${controller}/delete`, () => {
    const route = `${controller}/delete/`;
    const getRoute = `${controller}/get`;
    
    it("should success on deleting knights", async() => {
      const list = await request(app.getHttpServer())
      .get(getRoute);
      
      const target = list.body.data.result[0];
      const response = await request(app.getHttpServer()).delete(route + target._id);
      expect(response.status).toBe(200); 
      expect(response.body.messages[0].success).toBe(true);   
       
      const found = await request(app.getHttpServer())
      .get(`${getRoute}/${target._id}`);

      expect(found.body.deleted).toBe(true);
    });

    it("should fail on deleting knights with invalid id", async() => {
      const response = await request(app.getHttpServer()).delete(route + "invalid_Id");
      expect(response.body.messages[0].success).toBe(false);  
      
    });
  });

  describe(`Patch Route - ${controller}/update`, () => {
    const route = `${controller}/update/`;
    const getRoute = `${controller}/get`;
    
    it("should success on updating knight", async() => {
      const list = await request(app.getHttpServer())
      .get(getRoute + "?limit=1&page=1");
      const target = list.body.data.result[0];
      const newName = target.name + " updt"
      
      const obj = {
        name: newName,
        attributes:target.attributes,
        birthday: target.birthday,
        keyAttribute:target.keyAttribute,
        nickname:target.nickname,
        weapons:target.weapons,
        equipped: target.equipped[0]
      }

      const response = await request(app.getHttpServer())
        .patch(route + target._id)
        .send(obj);
        
      expect(response.status).toBe(200);
      expect(response.body.messages[0].success).toBe(true);
      expect(response.body.data.modifiedCount).toBe(1);
       
      const found = await request(app.getHttpServer())
      .get(`${getRoute}/${target._id}`);
      expect(found.body.name).toBe(newName);
    });


  });
});