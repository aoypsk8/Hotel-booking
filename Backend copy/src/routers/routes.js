const express = require('express');
const router = express.Router();
const { upload, multipleUpload } = require('../utils/multer');
const AuthienticationController = require('../controllerssssssssss/AuthienticationController');
const CustomerController = require('../controllerssssssssss/Customer');
const EmployeeController = require('../controllerssssssssss/employee');
const RoomsController = require('../controllerssssssssss/RoomsController');
const TypeController = require('../controllerssssssssss/TypeController');


//======================= AuthController =============================
router.post('/auth/login', AuthienticationController.login);


// customer
router.post('/customers/create', upload.single('image'), CustomerController.create);
router.get('/customers', CustomerController.getAll);
router.get('/customers/:Cus_ID', CustomerController.getById);
router.put('/customers/:Cus_ID', upload.single('image'), CustomerController.update);
router.delete('/customers/:Cus_ID', CustomerController.delete);

// employee
router.post("/employee/registerUser", upload.single('image'), EmployeeController.create);
router.get('/employees', EmployeeController.getAll);
router.put('/employees/:Emp_ID', upload.single('image'), EmployeeController.update);
router.delete('/employees/:Emp_ID', EmployeeController.delete);

// rooms
router.get('/rooms', RoomsController.getAll);
router.post("/rooms", RoomsController.create);
router.put('/rooms/:Room_ID', RoomsController.update);
router.delete('/rooms/:Room_ID', RoomsController.delete);
// type
router.get('/type', TypeController.getAll);
router.post('/type/create', multipleUpload, TypeController.create);
router.delete('/type/:Type_ID', TypeController.delete);
router.put('/type/:Type_ID', multipleUpload, TypeController.update);


//======================= CustomerController =============================
// router.get("/customer/getAll",CustomerController.getAllCustomers); 
// router.post("/customer/loginUser",CustomerController.loginCustomer); 
// router.post("/customer/registerUser",upload.single('image'),AuthCustomerController.registerCustomer); 
// router.delete("/customer/delete/:Cus_ID",AuthCustomerController.deleteCustomer); 

// router.get('/customer/:Cus_ID', AuthCustomerController.getCustomerByID);
// router.put('/customer/update/:Cus_ID', upload.single('image'), AuthCustomerController.updateCustomer); 

// //======================= EmployeeController =============================
// router.post("/auth/employee/loginUser",EmployeeController.loginEmployee); 
// router.post("/auth/employee/registerUser",upload.single('image'),EmployeeController.registerEmployee); 
// router.delete("/auth/employee/delete/:Emp_ID",EmployeeController.deleteEmployee); 
// router.get("/auth/employee/getAll",EmployeeController.getAllEmployee); 
// router.get('/auth/employee/:Emp_ID', EmployeeController.getEmployeeByID);
// router.put('/auth/employee/update/:Emp_ID', upload.single('image'), EmployeeController.updateEmployee); 

// //======================= ProductTypeController =============================
// router.post("/productType/create",upload.single('image'),ProductTypeController.createType); 
// router.put('/productType/update/:Product_Type_ID', upload.single('image'), ProductTypeController.updateType); 
// router.delete("/productType/delete/:Product_Type_ID",ProductTypeController.deleteType); 
// router.get("/productType/getAll",ProductTypeController.getAllType); 

// //======================= UnitController =============================
// router.post("/unit/create",upload.single('image'),UnitController.createUnit); 
// router.put('/unit/update/:Unit_ID',upload.single('image'),UnitController.updateUnit); 
// router.delete("/unit/delete",UnitController.deleteUnit); 
// router.get("/unit/getAll",UnitController.getAllUnits); 

// //======================= ProductController =============================
// router.post("/product/create",upload.single('image'),ProductController.createProduct); 
// router.delete("/product/delete/:Product_ID",ProductController.deleteProduct); 
// router.get("/product/getAll",ProductController.getAllProducts); 
// router.get("/product/getNew",ProductController.getNewestProducts); 
// router.get("/product/getProductByType/:Product_Type_ID",ProductController.getAllByTypeProducts); 
// router.put('/product/update/:Product_ID', upload.single('image'), ProductController.updateProduct); 

// //======================= SupplierController =============================
// router.post("/supplier/create",SupplierController.createSupplier); 
// router.delete("/supplier/delete",SupplierController.deleteSupplier); 
// router.get("/supplier/getAll",SupplierController.getAllSupplier); 
// router.put('/supplier/update/:Sl_ID',SupplierController.updateSupplier); 

// //======================= IMport Product Controller =============================
// router.post("/import/create",ImportProductController.createImport); 
// router.delete("/import/delete",ImportProductController.deleteImport); 
// router.get("/import/getAll",ImportProductController.getAllImport); 
// router.put('/import/update/:Ip_ID',ImportProductController.updateImport); 

// //======================= OrderController =============================
// router.post("/order/create",upload.single('image'),OrderProductController.createOrder); 
// router.get("/order/getAll",OrderProductController.getAllOrders); 
// router.get("/order/getOrderToday",OrderProductController.getOrderToday); 
// router.put('/order/update/:order_id',OrderProductController.updateOrder); 
// router.get('/orders/getByCustomer/:Cus_ID', OrderProductController.getOrdersByCustomer);
// router.get('/orders/getByID/:order_id', OrderProductController.getOrderById);


// //======================= SaleController =============================
// router.post("/sale/create",SaleProductController.createSale); 
// // router.get("/sale/getDetail",SaleProductController.getSaleDetails); 
// router.get("/sale/getAll",SaleProductController.getSaleAll); 

// //======================= CartController =============================
// router.post("/cart/addToCart",CartProductController.addToCart); 
// router.post("/cart/getAll",CartProductController.getCart); 
// router.delete("/cart/delete",CartProductController.deleteCartItem); 
// router.post("/cart/increaseQuantity",CartProductController.increaseQuantity); 
// router.post("/cart/decreaseQuantity",CartProductController.decreaseQuantity); 
// router.post("/cart/deleteProductInsideCart",CartProductController.deleteProductInsideCart); 


// //======================= incomeAndExpendController =============================
// router.get("/income/getAll",incomeAndExpendController.getIncome); 
// router.get("/outcome/getAll",incomeAndExpendController.getOutcome); 
module.exports = router;
