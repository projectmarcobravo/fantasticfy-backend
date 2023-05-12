const express = require("express");
const app = express();
const cors = require("cors");
const request = require("request");
const axios = require('axios')

const PORT = process.env.PORT || 5005;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", 'https://main--fantasticfy-products.netlify.app');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cors({ origin: "https://fantasticfy-products.netlify.app/" }));

app.get("/products", (req, res) => {
  const options = {
    url: "https://test-fullstack.myshopify.com/admin/api/2023-04/products.json",
    headers: {
      "X-Shopify-Access-Token": "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",
      "Content-Type": "application/json",
    },
  };

  app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    const options = {
      url: `https://test-fullstack.myshopify.com/admin/api/2023-04/products/${productId}.json`,
      headers: {
        "X-Shopify-Access-Token": "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",
        "Content-Type": "application/json",
      },
    };

    // Realiza una solicitud a la API de Shopify para obtener los detalles del producto según su ID
    axios
      .get(options.url, { headers: options.headers })
      .then((response) => {
        res.status(200).json(response.data.product);
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .json({ error: "Error al obtener los detalles del producto" });
      });
  });

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
      console.log(body);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
