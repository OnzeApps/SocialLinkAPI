const { openDatabase } = require('../database/database');


const postCard = (req, res) => {
  try {

    const db = openDatabase();
    const {
      description,
      image,
      userID
    } = req.body;

    const stmt = db.prepare("INSERT INTO posts (description, image, data, userID, likes, comentarios) VALUES (?, ?, ?, ?, ?, ?)");
    stmt.run(description, image, `${new Date()}`, userID, 0, 0);
    stmt.finalize();

    return res.status(200).json({
      success: true,
      message: 'Post Created.'
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
}

const getPosts = async (req, res) => {

  function GetDate(DatePost) {
    const dataFornecida = new Date(DatePost);
    const dataAtual = new Date();

    const diferencaEmMilissegundos = dataAtual - dataFornecida;

    const dias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencaEmMilissegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencaEmMilissegundos % (1000 * 60)) / 1000);

    let resultado = '';

    if (dias > 0) {
      resultado = `${dias}d `;
    } else if (horas > 0) {
      resultado = `${horas}h `;
    } else if (minutos > 0) {
      resultado = `${minutos}m `;
    } else {
      resultado = `${segundos}s`;
    }

    return resultado;
  }

  try {

    const db = openDatabase();


    db.all("SELECT id, description, data, likes, userID FROM posts", [], function(error, rows) {
      if (error) {
        throw error;
      }

      const posts = rows.map(row => ({
        id: row.id,
        description: row.description,
        data: GetDate(row.data),
        likes: row.likes,
        userID: row.userID
      }));
      
      db.close()
      
      return res.status(200).json(posts);
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
}

const getImage = (req, res) => {
  try {

    const { id } = req.params

    const db = openDatabase()

    db.get(
      'SELECT image FROM posts WHERE id = ?',
      [id],
      (err, row) => {
        if (err) {
          console.log(err);
          return res.status(500).send(
            'server error'
          )
        }

        db.close()

        res.setHeader('Content-Type', 'image/png')
        return res.end(
          Buffer.from(row.image, 'base64'),
          'binary'
        )
      }
    )

  } catch (error) {
    return res.status(400).json(
      {
        success: false,
        message: error
      }
    )
  }
}

module.exports = {
  postCard,
  getPosts,
  getImage
}