/** @format */

const { Image } = require("../models");
const Product = require("../models/product");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.findAll = (req, res) => {
  Image.findAll()
    .then((images) => {
      //findAll({where : {firstName: ""}})
      res.send(images);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.findOne = (req, res) => {
  // `/images/?ImageId=${Image.id}`
  Image.findAll({ where: { id: req.params.id } })
    .then((images) => {
      res.send(images);
      console.log(req.params.id);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

//a-propos

exports.findByComponent = (req, res) => {
  const name = req.params.name;
  console.log("params : ", name)
  Image.findAll({ where: { component: name } })
    .then((images) => {
      console.log(images)
      res.send(images);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
}

exports.findByRole = (req, res) => {
  const role = req.params.role;

  
  console.log("params : ", role)
  Image.findAll({ where: { role: role } })
    .then((images) => {
      console.log(images)
      res.send(images);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
}

exports.findImgRandom = async (req, res) => {
  let count;
  console.log(req.body)
  await Image.count({ where: { role: req.params.role, ProductId: req.params.pId } }).then((resp) => {
    count = resp
  });
  
  Image.findAll({ where: { role: req.params.role, ProductId: req.params.pId } })
    .then((images) => {
      console.log(images)
      res.send(images[getRandomInt(count)]);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
}

exports.findByProduct = (req, res) => {
  console.log(req.params);
  Image.findAll(
    { where: { ProductId: req.params.id, role: "principal" } }
  )
    .then((images) => {
      res.send(images);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

exports.create = (req, res) => {
  console.log(req.body)
  Image.create({
    name: req.body.name,
    size: req.body.size,
    type: req.body.type,
    description: req.body.description,
    path: req.body.path,
    role: req.body.role,
    ProductId: req.body.ProductId,
    component: req.body.component
  }).then((resp) => {
    res.send({message: "Image ajoutée."});
  }).catch((err) => {
    if (err) {
      console.log(err);
      res.send({message: "L'ajout à la base de données a échoué."})
    }
  });
  
};

exports.update = (req, res) => {
  console.log(req.body)
  Image.update({
    name: req.body.name,
    size: req.body.size,
    type: req.body.type,
    description: req.body.description,
    path: req.body.path,
    role: req.body.role,
    ProductId: req.body.ProductId,
    component: req.body.component
  }, {where: {id: req.params.id}}, {multi: true}).then((resp) => {
    res.send({message: "Image modifiée."});
  }).catch((err) => {
    if (err) {
      console.log(err);
      res.send({message: "La modification a échoué."})
    }
  });
}

exports.delete = (req, res) => {
  Image.destroy({ where: { id: req.params.id } }).then((resp) => {
    res.send({message: "Image supprimée."})}).catch((err) => {
      if (err) {
        console.log(err);
        res.send({message: "La suppression a échoué."})
      }
    })
};
