import moment from "moment";

class Order {
    constructor(id, items, totalAmount, date) {
        (this.id = id),
            (this.totalAmount = totalAmount),
            (this.items = items),
            (this.date = date);
    }

    get ReadableDate() {
        return moment(this.date).format("MMMM Do YYYY, hh:mm");
    }
}

export default Order;
