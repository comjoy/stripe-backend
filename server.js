const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const stripe = Stripe('sk_live_...KEBr'); // Replace with your secret key

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'gbp',
    payment_method_types: ['card'],
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));
