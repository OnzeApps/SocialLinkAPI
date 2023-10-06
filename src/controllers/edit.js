const { openDatabase } = require('../database/database')

const editVerificado = async (req, res) => {
  
  try {
    
    const db = openDatabase();
    
    const { id, verificado } = req.body;
    
    db.run("UPDATE usuarios SET verificado = ? WHERE id = ?", [verificado, id], function(error) {
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      db.close();
      
      return res.status(200).json({
        success: true,
        message: 'Successfully.'
      });
      
    })
    
  } catch(error) {
    
    return res.status(400).json({
      success: false,
      message: error.message
    });
    
  }
}

module.exports = {
  editVerificado
}