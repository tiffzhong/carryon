// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import "./ShopCheckout.css";
// import StripeCheckout from "react-stripe-checkout";
// import axios from "axios";
// import logo from "../Header/logo.png";

// class ShopCheckout extends Component {
//   constructor() {
//     super();
//     this.state = { amount: 100 };
//     this.onToken = this.onToken.bind(this);
//   }
//   onToken = token => {
//     const { amount } = this.state;
//     axios
//       .post("/save-stripe-token", { token, amount })
//       .then(response => alert("payment successful"));
//   };

//   render() {
//     const { amount } = this.state;
//     let { cart, total } = this.props;
//     console.log(cart, total, "do these come upppp???");
//     return (
//       <div className="shopping-checkout-container">
//         <h2>Your Cart</h2>

//         <Link to="/shoppingcart">
//           <button>Edit Cart</button>
//         </Link>
//         <input
//           type="text"
//           value={amount}
//           onChange={e => this.setState({ amount: e.target.value })}
//         />

//         <StripeCheckout
//           ComponentClass="stripe"
//           email="tiffzhong@gmail.com"
//           amount={amount}
//           description=""
//           token={this.onToken}
//           stripeKey="pk_test_NKSbb2ZSCA2K30SN2YBs7wPV"
//           name="Carry On" // the pop-in header title
//           description="Thank you for your order!" // the pop-in header subtitle
//           image={logo} // the pop-in header image (default none)
//           currency="USD"
//           shippingAddress
//           billingAddress={true}
//         />
//       </div>
//     );
//   }
// }
// export default ShopCheckout;
