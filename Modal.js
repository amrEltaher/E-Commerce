class User{
    constructor(name, email, ID, password, role){
        this.name = name;
        this.email = email;
        this.ID = ID;
        this.password = password;
        this.role = role;
        this.cart = [];
    }
    getUserProperties(){
        return {
            name: this.name,
            email: this.email,
            ID: this.ID,
            password: this.password,
            role: this.role
        }
    }
}
let u1 = new User("John", "", "455", "","customer");

console.log(u1.ID)
// create class for seller

class Seller{
    constructor(name, email, ID, password, role){
        this.name = name;
        this.email = email;
        this.ID = ID;
        this.password = password;
        this.role = role;
        this.cart = [];
    }
    getSellerProperties(){
        return {
            name: this.name,
            email: this.email,
            ID: this.ID,
            password: this.password,
            role: this.role
        }
    }
}
class seller extends User{
    constructor(name, email, ID, password, role){
        super(name, email, ID, password, role);
    }
}
class Admin extends User{
    constructor(name, email, ID, password, role){
        super(name, email, ID, password, role);
    }
}
class Product{
    constructor(name, description, price, stock, category){
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }
    getProductProperties(){
        return {
            name: this.name,
            description: this.description,
            price: this.price,
            stock: this.stock,
            category: this.category
        }
    }
}
class Orders {
    constructor(userID, orderID, orderDate, orderTotal, orderStatus){
        this.userID = userID;
        this.orderID = orderID;
        this.orderDate = orderDate;
        this.orderTotal = orderTotal;
        this.orderStatus = orderStatus;
    }
    getOrderProperties(){
        return {
            userID: this.userID,
            orderID: this.orderID,
            orderDate: this.orderDate,
            orderTotal: this.orderTotal,
            orderStatus: this.orderStatus
        }
    }
}
class SellerOrder{
    constructor(orderId, sellerId){
        this.orderId = orderId;
        this.sellerId = sellerId;
    }
    getSellerOrderProperties(){
        return {
            orderId: this.orderId,
            sellerId: this.sellerId
        }
    }
}
class userOrder{
    constructor(orderId, userId){
        this.orderId = orderId;
        this.userId = userId;
    }
    getUserOrderProperties(){
        return {
            orderId: this.orderId,
            userId: this.userId
        }
    }
}
export {User, Seller, Admin, Product, Orders, SellerOrder, userOrder};