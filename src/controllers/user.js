const {
  openDatabase
} = require('../database/database');

const register = async (req, res) => {

  try {

    const db = openDatabase();

    const {
      user,
      name,
      email,
      senha
    } = req.body;
    
    db.get("SELECT email FROM usuarios WHERE email = ?", email, (error, row) => {
      db.close();
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      if (row) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use.'
        });
      }
      
    });

    const stmt = db.prepare("INSERT INTO usuarios (verificado, usuario, nome, senha, email, seguidores, seguindo, posts) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    stmt.run('false', user, name, senha, email, 0, 0, 0);

    stmt.finalize();

    return res.status(200).json({
      success: true,
      message: 'Account registered successfully.'
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
}

const login = async (req, res) => {
  try {

    const db = openDatabase();

    const {
      usuario,
      senha
    } = req.body;

    db.get('SELECT id, usuario, email, senha FROM usuarios WHERE usuario = ? OR email = ?', [usuario, usuario], (error, row) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      if (row && row.senha === senha) {
        return res.status(200).json({
          success: true,
          uid: row.id,
          message: 'Login successfully.'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Login incorrect.'
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

const users = async (req, res) => {

  try {

    const db = openDatabase();

    db.all("SELECT * FROM usuarios",
      [],
      function(error, row) {
        db.close();
        return res.status(200).json(row);
      })

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
}

module.exports = {
  register, login, users
}