var crypto = require('crypto')

function UsuariosDAO(connection) {
	
	this._connection = connection();
}
UsuariosDAO.prototype.autenticar = function(usuario,req,res) {

	var self = this;
	let database = null;
	this._connection.then(
			
	   function(conn) {
			   database = conn;
				gotDb = conn.db('got');
				
				var senhaCriptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
				usuario.senha = senhaCriptografada;
				
				gotDb.collection('usuarios').find(usuario).toArray(function(err,result){
					
					
					console.log('Encontrado:');
					console.log(result);
					if(result[0]!=undefined){
						req.session.autorizado = true
						req.session.usuario = result[0].usuario
						req.session.casa = result[0].casa
						res.redirect('jogo')
						return true;
						
					} else{
						console.log('nao tem user')
						res.render('index', {validacao:{}});
					}
					

					
				})
			}
				

		   
		)
	
};



UsuariosDAO.prototype.inserirUsuario = function(usuario) {

	var self = this;
	let database = null;
		this._connection.then(
			
	   function(conn) {
			   database = conn;
				gotDb = conn.db('got');
				gotDb.collection('usuarios').insertOne(usuario, function(err, r) {
					console.log("cadastrado");
					
					
					var senhaCriptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
					console.log('Senha plana:' + usuario.senha);
					console.log('Senha criprografada:' + senhaCriptografada);
					
					usuario.senha = senhaCriptografada;
					
					
					//database.close();
					console.log(" conexao fechada");
					
				 })
			}
				

		   
		)		.then((result)=>{
			//database.close();
		///	console.log("2");
	    })
	
}

function closeConnection(connec) {
	  return new Promise(function(resolve, reject) {
			console.log("2");
		  resolve(connec.close());

	  }); 
	}


function save(connec) {
	  return new Promise(function(resolve, reject) {
			var gotDb = connec.db('got');
			resolve(gotDb.collection('usuarios').insertOne(usuario, function(err, r) {
				console.log("1");
				//console.log(usuario);
				//conn.close();
				
			 }));

	  }); 
	}

module.exports = function()	{
	
	return UsuariosDAO;
}