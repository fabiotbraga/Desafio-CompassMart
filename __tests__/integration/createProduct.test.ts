import app from '../../src/app'
import request from "supertest";
jest.setTimeout(1000000);

const Login = {
  email: 'emailtest@test.com',
  password: 'password'
};
const ProductExample = {
  title: 'Papel Alumínio',
  description: 'Papel Alumínio  30cm x 4m - Wyda',
  department: 'Embalagens e Descartáveis',
  brand: 'Wyda',
  price: 2.19,
  qtd_stock: 9,
  bar_codes: '2117293304445'
};

const PutProductExample = {
  title: 'Whisky',
  description: 'Whisky Escocês garrafa 1 Litro - White Horse',
  department: 'Bebidas',
  brand: 'White Horse',
  price: 78.9,
  qtd_stock: 1333
};

const PatchProductExample = {
  title: 'Whisky',
  description: 'Whisky Escocês Johnnie Walker - Red Label',
  department: 'Bebidas',
  brand: 'Johnnie Walker',
};

describe("Product Routes", () => {
  describe("Create Product Route Tests", () => {
    test("(POST) => Should be able to create a new Product", async () => {
      await request(app).post('/api/v1/user').send(Login);
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const response = await request(app).post("/api/v1/product").send(ProductExample).set('Authorization', `Bearer ${login.body.token}`);
      await request(app).delete(`/api/v1/product/${response.body._id}`).set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(201);
    });

    test("(POST) => Should not be able to register a product if the bar code already exists", async () => {
      await request(app).post('/api/v1/user').send(Login);
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const createProduct = await request(app).post("/api/v1/product").send(ProductExample).set('Authorization', `Bearer ${login.body.token}`);
      const response = await request(app).post('/api/v1/product').send(ProductExample).set('Authorization', `Bearer ${login.body.token}`);
      await request(app).delete(`/api/v1/product/${createProduct.body._id}`).set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(500);
    });

    test("(POST) => Should not be able to register a product if any field is empty", async () => {
      await request(app).post('/api/v1/user').send(Login);
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const response = await request(app).post("/api/v1/product").send({
        title: 'Papel Alumínio',
        description: 'Papel Alumínio  30cm x 4m - Wyda',
        department: 'Embalagens e Descartáveis',
      })
      .set('Authorization', `Bearer ${login.body.token}`);
      await request(app).delete(`/api/v1/product/${response.body._id}`).set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(400);
    });
  });
  
  describe("Find All Products Route Tests", () => {
    test("(GET) => Should be able to search all products", async () => {
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const createProduct = await request(app).post("/api/v1/product").send(ProductExample).set('Authorization', `Bearer ${login.body.token}`);
      const response = await request(app).get("/api/v1/product").set('Authorization', `Bearer ${login.body.token}`);
      await request(app).delete(`/api/v1/product/${createProduct.body._id}`).set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(200);
    });

    test('Should return not products found', async () => {
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const response = await request(app).get('/api/v1/product').set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("Find Product By ID Route Tests", () => {
    test("(GET) => Should be able to search for X registered product", async () => {
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const createProduct = await request(app).post("/api/v1/product").send(ProductExample).set('Authorization', `Bearer ${login.body.token}`);
      const response = await request(app).get(`/api/v1/product/${createProduct.body._id}`).set('Authorization', `Bearer ${login.body.token}`);
      await request(app).delete(`/api/v1/product/${createProduct.body._id}`).set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(200);
    });

    test("(GET) => Should not be able to find an invalid id", async () => {
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const response = await request(app).get(`/api/v1/product/${1111111}`).set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(400);
    });

    test("(GET) => Should not be able to find an id that does not exist", async () => {
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const response = await request(app).get("/api/v1/product/00000000a00000000a00a000").set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("Update Product Route Tests (PUT)", () => {
    test("(PUT) => Should be able to update X registered product", async () => {
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const createProduct = await request(app).post("/api/v1/product").send(ProductExample).set('Authorization', `Bearer ${login.body.token}`);
      const response = await request(app).put(`/api/v1/product/${createProduct.body._id}`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(PutProductExample);
      await request(app).delete(`/api/v1/product/${createProduct.body._id}`).set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Update Product Route Tests (PATCH)", () => {
    test("(PATCH) => Should be able to update X registered product", async () => {
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const createProduct = await request(app).post("/api/v1/product").send(ProductExample).set('Authorization', `Bearer ${login.body.token}`);
      const response = await request(app).patch(`/api/v1/product/${createProduct.body._id}`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(PatchProductExample);
      await request(app).delete(`/api/v1/product/${createProduct.body._id}`).set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Delete Product Route Tests", () => {
    test("(DELETE) => Must be able to delete X registered product", async () => {
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const createProduct = await request(app).post("/api/v1/product").send(ProductExample).set('Authorization', `Bearer ${login.body.token}`);
      const response = await request(app).delete(`/api/v1/product/${createProduct.body._id}`).set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(204);
    });
  });

  describe("Find Products Low Stock Route Tests", () => {
    test("(GET) => Should be able to list all products that are in low stock", async () => {
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const createProduct = await request(app).post("/api/v1/product").send(ProductExample).set('Authorization', `Bearer ${login.body.token}`);
      const response = await request(app).get("/api/v1/product/low_stock").set('Authorization', `Bearer ${login.body.token}`);
      await request(app).delete(`/api/v1/product/${createProduct.body._id}`).set('Authorization', `Bearer ${login.body.token}`);
      expect(response.statusCode).toBe(200);
    });
  });
  /*
  describe("CSV Route Tests", () => {
    test("(POST) => Should be able to create new products using a CSV", async () => {
      const login = await request(app).post('/api/v1/user/authenticate').send(Login);
      const response = await request(app).post('/api/v1/product/csv')
        .set('Authorization', `Bearer ${login.body.token}`)
        .attach('file', '__tests__/docs_tests/lista_produtos_corrigida.csv');
        expect(response.statusCode).toBe(200);
    });
    
  });
  /*
  describe("Mapper Route Tests", () => {
  
  });
  */
});